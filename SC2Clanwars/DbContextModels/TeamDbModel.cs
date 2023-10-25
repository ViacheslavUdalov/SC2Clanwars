using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDbGenericRepository.Attributes;

namespace SC2Clanwars.DbContextModels;
[CollectionName("Teams")]
public class TeamDbModel
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("Name")]
    public string Name { get; set; }

    [BsonElement("Avatar")]
    public string Avatar { get; set; }
    
    [BsonElement("Players")]
    [BsonRepresentation(BsonType.String)] 
    public HashSet<string>? Players { get; set; }
    
    [BsonElement("CreatorId")]
    [BsonRepresentation(BsonType.String)] 
    public string? CreatorId { get; set; }
    public TeamDbModel()
    {
        // Инициализируем массив игроков как пустой
        Players = new HashSet<string>();
    }
}