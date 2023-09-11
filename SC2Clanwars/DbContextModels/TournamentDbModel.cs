using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using SC2Clanwars.Models;

namespace SC2Clanwars.DbContextModels;

public class TournamentDbModel
{
    [BsonId]
    public ObjectId Id { get; set; }

    [BsonElement("Name")]
    public string Name { get; set; }

    [BsonElement("PrizePool")]
    public string? PrizePool { get; set; }

    [BsonElement("Teams")]
    public TeamModel[]? Teams { get; set; }

    [BsonElement("Avatar")]
    public string? Avatar { get; set; }
}