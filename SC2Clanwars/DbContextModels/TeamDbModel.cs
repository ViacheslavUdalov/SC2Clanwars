using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SC2Clanwars.DbContextModels;

public class TeamDbModel
{
    [BsonId]
    public ObjectId Id { get; set; }

    [BsonElement("Name")]
    public string Name { get; set; }

    [BsonElement("Players")]
    public ApplicationUser[] Players { get; set; }
}