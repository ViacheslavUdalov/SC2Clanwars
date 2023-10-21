using AspNetCore.Identity.MongoDbCore.Models;
using MongoDB.Driver;
using SC2Clanwars.DbContextModels;

namespace SC2Clanwars.Repositories;

public class UsersRepository
{
    private readonly IMongoCollection<ApplicationUser> _mongoCollection;

    public UsersRepository(IMongoCollection<ApplicationUser> mongoCollection)
    {
        _mongoCollection = mongoCollection;
    }

    public async Task<List<ApplicationUser>> GetAllUserAsync()
    {
        var users = await _mongoCollection.Find(_ => true).ToListAsync();
        return users;
    }

    public async Task<ApplicationUser> GetOneUserAsync(Guid id)
    {
        var user = await _mongoCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
        return user;
    }
    public async Task<ApplicationUser> UpdateUserAsync(Guid id, ApplicationUser user)
    {
        await _mongoCollection.ReplaceOneAsync(x => x.Id == id, user);
        return user;
    }

    public async Task DeleteOneUserAsync(Guid id)
    {
        await _mongoCollection.DeleteOneAsync(x => x.Id == id);
    }
}