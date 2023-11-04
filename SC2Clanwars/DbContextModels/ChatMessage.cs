using MongoDB.Bson;
using MongoDbGenericRepository.Attributes;

namespace SC2Clanwars.DbContextModels;

[Serializable]
public class ChatMessageInTeam
{
    public ObjectId Id { get; set; }
    public string User { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public DateTime Timestamp { get; set; }
    public string Room { get; set; } = string.Empty;
}
[Serializable]
public class ChatMessageWithUser
{
    public ObjectId Id { get; set; }
    public string SenderId { get; set; } = string.Empty;
    public string ReceiverId { get; set; } = string.Empty;
    public DateTime Timestamp { get; set; }
    public string Message { get; set; } = string.Empty;
}