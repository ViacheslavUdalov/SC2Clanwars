using MongoDB.Driver;
using SC2Clanwars.DbContextModels;

namespace SC2Clanwars.Repositories;

public class TournamentsRepository
{
    private readonly IMongoCollection<TournamentDbModel> _tournamentCollection;

    public TournamentsRepository(IMongoCollection<TournamentDbModel> tournamentCollection)
    {
        _tournamentCollection = tournamentCollection;
    }

    public async Task<List<TournamentDbModel>>  GetAllTournamentsAsync()
    {
        var tournaments = await _tournamentCollection.Find(_ => true).ToListAsync();
        return tournaments;
    }

    public async Task<TournamentDbModel> GetOneTournamentAsync(string id)
    {
       var tournament = await _tournamentCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
       return tournament;
    }
    public async Task<TournamentDbModel> CreateTournament(TournamentDbModel tournament)
    {
        // var tournamentModel = _tournamentsMapper.MapTournamentDbModel(tournament);
        await _tournamentCollection.InsertOneAsync(tournament);
        return tournament;
    }

    public async Task<TournamentDbModel> UpdateTournamentAsync(string id, TournamentDbModel tournament)
    {
        await _tournamentCollection.ReplaceOneAsync(x => x.Id == id, tournament);
        return tournament;
    }

    public async Task DeleteOneTournamentAsync(string id)
    {
        await _tournamentCollection.DeleteOneAsync(x => x.Id == id);
    }
}