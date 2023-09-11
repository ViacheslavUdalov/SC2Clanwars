using MongoDB.Driver;
using SC2Clanwars.DbContextModels;
using SC2Clanwars.Mappers;
using SC2Clanwars.Models;

namespace SC2Clanwars.Repositories;

public class TournamentsRepository
{
    private readonly IMongoCollection<TournamentDbModel> _tournamentCollection;
    private readonly ITournamentsMapper _tournamentsMapper;

    public TournamentsRepository(IMongoCollection<TournamentDbModel> tournamentCollection, ITournamentsMapper tournamentsMapper)
    {
        _tournamentCollection = tournamentCollection;
        _tournamentsMapper = tournamentsMapper;
    }

    public List<TournamentModel> GetAllTournaments()
    {
        var tournamentsDbModels = _tournamentCollection.Find(_ => true).ToList();
        var tournaments = tournamentsDbModels.Select(_tournamentsMapper.MapTournamentModel).ToList();
        return tournaments;
    }
}