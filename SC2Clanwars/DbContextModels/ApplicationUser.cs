using AspNetCore.Identity.MongoDbCore.Models;
using MongoDbGenericRepository.Attributes;

namespace SC2Clanwars.DbContextModels;

[CollectionName("Users")]
public class ApplicationUser : MongoIdentityUser<Guid>
{
    public string FullName { get; set; } = string.Empty;
    public string PortraitUrl { get; set; } = string.Empty;
    public string BannerUrl { get; set; } = string.Empty;
    public string MainRace { get; set; } = string.Empty;
    public string Team { get; set; } = string.Empty;
}