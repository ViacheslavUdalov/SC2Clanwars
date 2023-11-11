using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDbGenericRepository.Attributes;


namespace SC2Clanwars.DbContextModels;

[CollectionName("Tournaments")]
public class TournamentDbModel
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("Name")]
    [Required]
    public string Name { get; set; } = string.Empty;

    [BsonElement("PrizePool")]
    public string? PrizePool { get; set; } = string.Empty;

    [BsonElement("Teams")]
    [BsonRepresentation(BsonType.String)]
    public HashSet<string>? Teams { get; set; }
    
    [BsonElement("Avatar")]
    public string? Avatar { get; set; } = string.Empty;
    
    [BsonElement("Players")]
    [BsonRepresentation(BsonType.String)] 
    public HashSet<string>? Players { get; set; }
    
    [BsonElement("CreatorId")]
    [BsonRepresentation(BsonType.String)] 
    public string? CreatorId { get; set; }
    
    public TournamentDbModel()
    {
        // Инициализируем массив игроков и команд как пустой
        Players = new HashSet<string>();
        Teams = new HashSet<string>();
    }
}
