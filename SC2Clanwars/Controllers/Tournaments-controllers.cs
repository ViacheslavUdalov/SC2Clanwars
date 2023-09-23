using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using SC2Clanwars.DbContextModels;
using SC2Clanwars.Mappers;
using SC2Clanwars.Models;
using SC2Clanwars.Repositories;

namespace SC2Clanwars.Controllers;
[ApiController]
[Route("api/[controller]")]
public class TournamentsController : ControllerBase
{
  private readonly IMongoCollection<TournamentDbModel> _tournamentCollection;
  private readonly ITournamentsMapper _tournamentsMapper;
  private readonly TournamentsRepository _tournamentsRepository;

  public TournamentsController(
    IMongoCollection<TournamentDbModel> tournamentCollection,
    ITournamentsMapper tournamentsMapper,
    TournamentsRepository tournamentsRepository)
  {
    // _tournamentsCollection = database.GetCollection<TournamentDbModel>("Sc2ClanWars");
    _tournamentCollection = tournamentCollection;
    _tournamentsMapper = tournamentsMapper;
    _tournamentsRepository = tournamentsRepository;
  }
  [HttpPost("/create")]
  public async Task<TournamentDbModel> CreateTournamentRepository(TournamentModel tournament)
  {
    var tournamentModel = _tournamentsMapper.MapTournamentDbModel(tournament);
    await _tournamentCollection.InsertOneAsync(tournamentModel);
    return tournamentModel;
  }
  [HttpGet]
  [Route("")]
  public async Task<List<TournamentModel>> GetAllTournaments()
  {
    var tournamentsDbModels = await _tournamentCollection.Find(_ => true).ToListAsync();
    var tournaments = tournamentsDbModels.Select(_tournamentsMapper.MapTournamentModel).ToList();
    return tournaments;
  }
}