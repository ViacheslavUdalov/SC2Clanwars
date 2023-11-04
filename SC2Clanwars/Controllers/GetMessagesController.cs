using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using SC2Clanwars.DbContextModels;

namespace SC2Clanwars.Controllers;

[ApiController]
[Route("api/getmessages")]
public class GetMessagesController : ControllerBase
{
    private readonly IMongoDatabase _database;

    public GetMessagesController(IMongoDatabase database)
    {
        _database = database;
    }

    [HttpGet("getmessagesfromuser/{senderId}&{receiverId}")]
    public async Task<List<ChatMessageWithUser>> GetMessagesBetweenUser(string senderId, string receiverId)
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
        return messages;
    }


private string GenerateIdForDialogs(string senderId, string receiverId)
    {
        return $"{senderId}_{receiverId}";
    }
}