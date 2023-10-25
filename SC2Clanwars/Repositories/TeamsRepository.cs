using MongoDB.Driver;
using SC2Clanwars.DbContextModels;

namespace SC2Clanwars.Repositories;

public class TeamsRepository
{
    private readonly IMongoCollection<TeamDbModel> _mongoCollection;

    public TeamsRepository(IMongoCollection<TeamDbModel> mongoCollection)
    {
        _mongoCollection = mongoCollection;
    }
    public async Task<List<TeamDbModel>>  GetAllTeamsAsync()
    {
        var teams = await _mongoCollection.Find(_ => true).ToListAsync();
        return teams;
    }

    public async Task<TeamDbModel> GetOneTeamAsync(string id)
    {
        var team = await _mongoCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
        return team;
    }
    public async Task<TeamDbModel> CreateTeam(TeamDbModel team)
    {
        // var tournamentModel = _tournamentsMapper.MapTournamentDbModel(tournament);
        await _mongoCollection.InsertOneAsync(team);
        return team;
    }

    public async Task<TeamDbModel> UpdateTeamAsync(string id, TeamDbModel team)
    {
        await _mongoCollection.ReplaceOneAsync(x => x.Id == id, team);
        return team;
    }

    public async Task DeleteOneTeamAsync(string id)
    {
        await _mongoCollection.DeleteOneAsync(x => x.Id == id);
    }
}