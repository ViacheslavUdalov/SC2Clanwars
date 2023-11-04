using Microsoft.AspNetCore.SignalR;
using MongoDB.Driver;
using SC2Clanwars.DbContextModels;
using SC2Clanwars.SignalRModel;

namespace SC2Clanwars.Hubs;

public class ChatHub : Hub
{
    private readonly Dictionary<string, UserRoomConnection> _connections;
    private readonly IMongoCollection<ChatMessageInTeam> _mongoCollection;
    private readonly IMongoDatabase _database;
    public ChatHub(Dictionary<string, UserRoomConnection> connections,
        IMongoCollection<ChatMessageInTeam> mongoCollection, IMongoDatabase database
    )
    {
        _connections = connections;
        _mongoCollection = mongoCollection;
        _database = database;
    }

    private async Task TrimMessages(string room, int maxMessages, IMongoCollection<ChatMessageInTeam> collection)
    {
        var filter = Builders<ChatMessageInTeam>.Filter.Eq("Room", room);
        var chatMessages = await collection.Find(filter)
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
        var chatMessage = new ChatMessageInTeam
        {
            User = userConnection.User,
            Message = "has joined the Group",
            Timestamp = DateTime.Now,
            Room = userConnection.Room
        };
        await Clients.Groups(userConnection.Room!)
            .SendAsync("ReceiveMessage", chatMessage);
        await SendConnectedUser(userConnection.Room!);
    }

    public async Task SendMessage(string message)
    {
        if (_connections.TryGetValue(Context.ConnectionId, out UserRoomConnection roomConnection))
        {
            var dialogId = roomConnection.Room;
            // var collectionNames = await _database.ListCollectionNamesAsync();
            // var collectionExist = collectionNames.ToList().Contains(dialogId);
            var chatMessage = new ChatMessageInTeam
            {
                User = roomConnection.User,
                Message = message,
                Timestamp = DateTime.Now,
                Room = roomConnection.Room
            };
            var collection =  _database.GetCollection<ChatMessageInTeam>(dialogId);
            await collection.InsertOneAsync(chatMessage);
            int maxMessages = 300;
            long messagesCount = collection.CountDocuments(
                Builders<ChatMessageInTeam>.Filter.Eq("Room", roomConnection.Room));
            if (maxMessages > messagesCount)
            {
                await TrimMessages(roomConnection.Room, maxMessages, collection);
            }

            await Clients.Groups(roomConnection.Room!)
                .SendAsync("ReceiveMessage", chatMessage);
        }
    }

    public override Task OnDisconnectedAsync(Exception? exp)
    {
        if (!_connections.TryGetValue(Context.ConnectionId, out UserRoomConnection roomConnection))
        {
            return base.OnDisconnectedAsync(exp);
        }
        _connections.Remove(Context.ConnectionId);
        var chatMessage = new ChatMessageInTeam
        {
            User = roomConnection.User,
            Message = "has left the Group",
            Timestamp = DateTime.Now,
            Room = roomConnection.Room
        };
        Clients.Groups(roomConnection.Room!)
            .SendAsync("ReceiveMessage",  chatMessage);
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

    public async Task GetAllMessagesFromDb(string room)
    {
        if (_connections.TryGetValue(Context.ConnectionId, out UserRoomConnection roomConnection))
        {
            var collection = _database.GetCollection<ChatMessageInTeam>(room);
            var messages = await collection.Find(_ => true).ToListAsync();
            await Clients.Groups(roomConnection.Room!)
                .SendAsync("ReceivedMessages", messages);
        }
       
    }
}