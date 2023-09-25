using Microsoft.AspNetCore.Http.HttpResults;
using MongoDB.Bson;
using MongoDB.Driver;
using SC2Clanwars.DbContextModels;
using SC2Clanwars.Mappers;
using SC2Clanwars.Repositories;

namespace SC2Clanwars.Services;

public class TournamentsService
{
    private readonly IMongoCollection<TournamentDbModel> _tournamentCollection;
    private readonly ITournamentsMapper _tournamentsMapper;
    private readonly TournamentsRepository _tournamentsRepository;

    public TournamentsService(
        IMongoCollection<TournamentDbModel> tournamentCollection,
        ITournamentsMapper tournamentsMapper,
        TournamentsRepository tournamentsRepository)
    {
        _tournamentCollection = tournamentCollection;
        _tournamentsMapper = tournamentsMapper;
        _tournamentsRepository = tournamentsRepository;
    }
    public async Task<List<TournamentDbModel>> GetAllTournamentsService() =>
        await _tournamentCollection.Find(_ => true).ToListAsync();

    public async Task<TournamentDbModel> GetOneTournamentService(string id)
    {
        return await _tournamentCollection.Find(tournament => tournament.Id == id).FirstOrDefaultAsync();
    }
}