using AspNetCore.Identity.MongoDbCore.Models;
using MongoDbGenericRepository.Attributes;

namespace SC2Clanwars.DbContextModels;
[CollectionName("Roles")]
public class ApplicationRole : MongoIdentityRole<Guid>
{
    
}