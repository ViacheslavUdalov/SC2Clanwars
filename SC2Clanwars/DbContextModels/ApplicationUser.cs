using AspNetCore.Identity.MongoDbCore.Models;
using MongoDbGenericRepository.Attributes;

namespace SC2Clanwars.DbContextModels;

[CollectionName("Users")]
public class ApplicationUser : MongoIdentityUser<Guid>
{
}