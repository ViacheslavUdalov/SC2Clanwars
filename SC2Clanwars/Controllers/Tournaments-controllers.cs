using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using SC2Clanwars.DbContextModels;
using SC2Clanwars.Mappers;
using SC2Clanwars.Models;
using SC2Clanwars.Repositories;
using SC2Clanwars.Services;

namespace SC2Clanwars.Controllers;
[ApiController]
[Route("api/[controller]")]
public class TournamentsController : ControllerBase
{
  private readonly IMongoCollection<TournamentDbModel> _tournamentCollection;
  private readonly ITournamentsMapper _tournamentsMapper;
  private readonly TournamentsRepository _tournamentsRepository;
  private readonly TournamentsService _tournamentsService;
  public TournamentsController(
    IMongoCollection<TournamentDbModel> tournamentCollection,
    ITournamentsMapper tournamentsMapper,
    TournamentsRepository tournamentsRepository,
    TournamentsService tournamentsService)
  {
    // _tournamentsCollection = database.GetCollection<TournamentDbModel>("Sc2ClanWars");
    _tournamentCollection = tournamentCollection;
    _tournamentsMapper = tournamentsMapper;
    _tournamentsRepository = tournamentsRepository;
    _tournamentsService = tournamentsService;
  }
  [HttpPost("create")]
  public async Task<TournamentDbModel> CreateTournamentRepository(TournamentModel tournament)
  {
    var tournamentModel = _tournamentsMapper.MapTournamentDbModel(tournament);
    await _tournamentCollection.InsertOneAsync(tournamentModel);
    return tournamentModel;
  }

  [HttpGet("")]
  [ProducesResponseType(StatusCodes.Status200OK)]
  public async Task<List<TournamentDbModel>> GetAllTournaments()
  {
   return await _tournamentsService.GetAllTournamentsService();
  }

  [HttpGet("{id}")]
  [ProducesResponseType(StatusCodes.Status200OK)]
  [ProducesResponseType(StatusCodes.Status400BadRequest)]
  [ProducesResponseType(StatusCodes.Status404NotFound)]
  public async Task<ActionResult<TournamentDbModel>> GetOneTournament(string id)
  {
    if (string.IsNullOrEmpty(id))
    {
      return BadRequest();
    }
    var tournament =  await _tournamentsService.GetOneTournamentService(id);
    if (tournament is null)
    {
      return NotFound();
    }

    return tournament;
  }
}