using MongoDB.Bson;
using MongoDbGenericRepository.Attributes;

namespace SC2Clanwars.DbContextModels;
[CollectionName("ChatMessage")]
public class ChatMessage
{
    public ObjectId Id { get; set; }
    public string User { get; set; }
    public string Message { get; set; }
    public DateTime Timestamp { get; set; }
    public string Room { get; set; }
}