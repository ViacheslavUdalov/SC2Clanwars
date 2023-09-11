using MongoDB.Driver;
using SC2Clanwars.DbContextModels;

namespace SC2Clanwars.Configuration;

public static class MongoDbDependencyConfig
{
    public static void AddMongoDbDependencies(this IServiceCollection services, string connectionString, string databaseName)
    {
        services.AddSingleton<IMongoClient>(provider => new MongoClient(connectionString));
        services.AddScoped<IMongoDatabase>(provider =>
        {
            var mongoClient = provider.GetRequiredService<IMongoClient>();
            return mongoClient.GetDatabase(databaseName);
        });

        services.AddScoped<IMongoCollection<TournamentDbModel>>(provider =>
        {
            var database = provider.GetRequiredService<IMongoDatabase>();
            return database.GetCollection<TournamentDbModel>("Tournaments");
        });

        services.AddScoped<IMongoCollection<PlayerDbModel>>(provider =>
        {
            var database = provider.GetRequiredService<IMongoDatabase>();
            return database.GetCollection<PlayerDbModel>("Players");
        });

        services.AddScoped<IMongoCollection<TeamDbModel>>(provider =>
        {
            var database = provider.GetRequiredService<IMongoDatabase>();
            return database.GetCollection<TeamDbModel>("Teams");
        });
    }
}