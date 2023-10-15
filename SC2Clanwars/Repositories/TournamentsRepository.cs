using Amazon.SecurityToken.Model;
using Microsoft.AspNetCore.Http.HttpResults;
using MongoDB.Driver;
using SC2Clanwars.DbContextModels;
using SC2Clanwars.Mappers;
using SC2Clanwars.Models;

namespace SC2Clanwars.Repositories;

public class TournamentsRepository
{
    private readonly IMongoCollection<TournamentDbModel> _tournamentCollection;
    private readonly ITournamentsMapper _tournamentsMapper;

    public TournamentsRepository(IMongoCollection<TournamentDbModel> tournamentCollection, 
        ITournamentsMapper tournamentsMapper)
    {
        _tournamentCollection = tournamentCollection;
        _tournamentsMapper = tournamentsMapper;
    }

    public async Task<List<TournamentDbModel>>  GetAllTournaments()
    {
        var tournaments = await _tournamentCollection.Find(_ => true).ToListAsync();
        // var tournaments = tournamentsDbModels.Select(_tournamentsMapper.MapTournamentModel).ToList();
        return tournaments;
    }

    public async Task<TournamentDbModel> GetOneTournament(string id)
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

    public async Task<TournamentDbModel> UpdateTournament(string id, TournamentDbModel tournament)
    {
        await _tournamentCollection.ReplaceOneAsync(x => x.Id == id, tournament);
        return tournament;
    }

    public async Task DeleteOneTournament(string id)
    {
        await _tournamentCollection.DeleteOneAsync(x => x.Id == id);
    }
}