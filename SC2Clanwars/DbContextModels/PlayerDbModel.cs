using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SC2Clanwars.DbContextModels;

public class PlayerDbModel
{
    [BsonId]
    public ObjectId Id { get; set; }

    [BsonElement("PlayerId")]
    public int PlayerId { get; set; }

    [BsonElement("Nickname")]
    public string Nickname { get; set; }

    [BsonElement("Race")]
    public string Race { get; set; }

    [BsonElement("Avatar")]
    public string? Avatar { get; set; }
}