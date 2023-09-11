using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using SC2Clanwars.Models;

namespace SC2Clanwars.DbContextModels;

public class TeamDbModel
{
    [BsonId]
    public ObjectId Id { get; set; }

    [BsonElement("Name")]
    public string Name { get; set; }

    [BsonElement("Players")]
    public PlayerModel[] Players { get; set; }
}