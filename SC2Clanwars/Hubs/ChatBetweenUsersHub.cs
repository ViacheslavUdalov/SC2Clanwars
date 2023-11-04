using Microsoft.AspNetCore.SignalR;
using MongoDB.Bson;
using MongoDB.Driver;
using SC2Clanwars.DbContextModels;
using SC2Clanwars.SignalRModel;

namespace SC2Clanwars.Hubs;

public class ChatBetweenUsersHub : Hub
{
    private readonly IMongoCollection<ChatMessageInTeam> _mongoCollection;
    private readonly IMongoDatabase _database;

    public ChatBetweenUsersHub(
        IMongoCollection<ChatMessageInTeam> mongoCollection,
        IMongoDatabase database)
    {
        _mongoCollection = mongoCollection;
        _database = database;
    }

    public async Task SendMessageToUniqueUser(string senderId, string receiverId, string message)
    {
        try
        {
            string dialogsId = GenerateIdForDialogs(senderId, receiverId);
            var collectionNames = await _database.ListCollectionNamesAsync();
            bool collectionExists = collectionNames.ToList().Contains(dialogsId);

            if (!collectionExists)
            {
                dialogsId = GenerateIdForDialogs(receiverId, senderId);
            }

            var collection = _database.GetCollection<ChatMessageWithUser>(dialogsId);
            var messageToDb = new ChatMessageWithUser
            {
                Id = new ObjectId(),
                SenderId = senderId,
                ReceiverId = receiverId,
                Message = message,
                Timestamp = DateTime.Now
            };
            await collection.InsertOneAsync(messageToDb);
            await Clients.User(senderId).SendAsync("ReceiveUserMessage", messageToDb);
            // await Clients.User(receiverId).SendAsync("ReceiveUserMessage", messageToDb);
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
        var collectionNames = await _database.ListCollectionNamesAsync();
        bool collectionExists = collectionNames.ToList().Contains(dialogId);
        if (!collectionExists)
        {
            dialogId = GenerateIdForDialogs(receiverId, senderId);
        }
        var collection = _database.GetCollection<ChatMessageWithUser>(dialogId);
            var messages = await collection.Find(_ => true).ToListAsync();
            await Clients.User(senderId).SendAsync("ReceiveUsersMessages", messages);
    }
}