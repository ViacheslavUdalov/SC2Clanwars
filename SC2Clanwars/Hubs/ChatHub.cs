using Microsoft.AspNetCore.SignalR;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.IdGenerators;
using MongoDB.Driver;
using SC2Clanwars.DbContextModels;
using SC2Clanwars.SignalRModel;

namespace SC2Clanwars.Hubs;

public class ChatHub : Hub
{
    private readonly Dictionary<string, UserRoomConnection> _connections;
    private readonly IMongoCollection<ChatMessageInTeam> _mongoCollection;
    private readonly IMongoDatabase _database;
    public ChatHub(Dictionary<string, UserRoomConnection> connections, IMongoCollection<ChatMessageInTeam> mongoCollection, IMongoDatabase database)
    {
        _connections = connections;
        _mongoCollection = mongoCollection;
        _database = database;
    }

    private async Task TrimMessages(string room, int maxMessages)
    {
        var filter = Builders<ChatMessageInTeam>.Filter.Eq("Room", room);
        var chatMessages = await _mongoCollection.Find(filter)
            .SortByDescending(mes => mes.Timestamp)
            .Skip(maxMessages)
            .ToListAsync();
        foreach (var message in chatMessages)
        {
            await _mongoCollection.DeleteOneAsync(msg => msg.Id == message.Id);
        }
    }

    public async Task JoinRoom(UserRoomConnection userConnection)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Room!);
        _connections[Context.ConnectionId] = userConnection;
        await Clients.Groups(userConnection.Room!)
            .SendAsync("ReceiveMessage", "Let's Program", $"{userConnection.User} has joined the Group", DateTime.Now);
        await SendConnectedUser(userConnection.Room!);
    }

    public async Task SendMessage(string message)
    {
        if (_connections.TryGetValue(Context.ConnectionId, out UserRoomConnection roomConnection))
        {
            var chatMessage = new ChatMessageInTeam
            {
                User = roomConnection.User,
                Message = message,
                Timestamp = DateTime.Now,
                Room = roomConnection.Room
            };
            await _mongoCollection.InsertOneAsync(chatMessage);
            int maxMessages = 300;
            long messagesCount = _mongoCollection.CountDocuments(
                Builders<ChatMessageInTeam>.Filter.Eq("Room", roomConnection.Room));
            if (maxMessages > messagesCount)
            {
                await TrimMessages(roomConnection.Room, maxMessages);
            }

            await Clients.Groups(roomConnection.Room!)
                .SendAsync("ReceiveMessage", roomConnection.User, message, DateTime.Now);
        }
    }

    public override Task OnDisconnectedAsync(Exception? exp)
    {
        if (!_connections.TryGetValue(Context.ConnectionId, out UserRoomConnection roomConnection))
        {
            return base.OnDisconnectedAsync(exp);
        }
        _connections.Remove(Context.ConnectionId);
        Clients.Groups(roomConnection.Room!)
            .SendAsync("ReceiveMessage", "let's Program", $"{roomConnection.User} has left the Group", DateTime.Now);
        SendConnectedUser(roomConnection.Room!);
        return base.OnDisconnectedAsync(exp);
    }

    public Task SendConnectedUser(string room)
    {
        var users = _connections.Values
            .Where(u => u.Room == room)
            .Select(s => s.User);
        return Clients.Groups(room).SendAsync("ConnectedUser", users);
    }

    public async Task SendMessageToUniqueUser(string senderId, string receiverId, string message)
    {
        try
        {
            string dialogsId = GenerateIdForDialogs(senderId, receiverId);
            var collection = _database.GetCollection<ChatMessageWithUser>(dialogsId);
           await collection.InsertOneAsync(new ChatMessageWithUser
            {
                Id = new ObjectId(),
                senderId = senderId,
                receiverId = receiverId,
                message = message,
                Timestamp = DateTime.Now
            });
            await Clients.Client(senderId).SendAsync("ReceiveUserMessage", receiverId, senderId, message);
            await Clients.Client(receiverId).SendAsync("ReceiveUserMessage", senderId, receiverId, message);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        } 
    }

    private string GenerateIdForDialogs(string senderId, string receiverId)
    {
        return $"{senderId}_{receiverId}";
    }

    public async Task GetAllMessagesBetweenUsers(string senderId, string receiverId)
    {
        var dialogId = GenerateIdForDialogs(senderId, receiverId);
        var collection = _database.GetCollection<ChatMessageWithUser>(dialogId);
        var messages = await collection.Find(_ => true).ToListAsync();
        await Clients.Client(senderId).SendAsync("ReceiveUsersMessages", messages);
    }
}