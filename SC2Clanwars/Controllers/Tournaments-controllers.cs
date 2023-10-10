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
  [ProducesResponseType(StatusCodes.Status404NotFound)]
  [ProducesResponseType(StatusCodes.Status200OK)]
  public async Task<ActionResult<TournamentDbModel>> CreateTournamentRepository(TournamentModel tournament)
  {
    var tournamentModel = _tournamentsMapper.MapTournamentDbModel(tournament);
    await _tournamentCollection.InsertOneAsync(tournamentModel);
    if (tournamentModel is null)
    {
      return NotFound();
    }
    return tournamentModel;
  }

  [HttpGet("")]
  [ProducesResponseType(StatusCodes.Status200OK)]
  public async Task<List<TournamentDbModel>> GetAllTournaments()
  {
   return await _tournamentsService.GetAllTournamentsService();
  }

  [HttpGet("{id}")]
  [ProducesResponseType(StatusCodes.Status400BadRequest)]
  [ProducesResponseType(StatusCodes.Status200OK)]
  [ProducesResponseType(StatusCodes.Status404NotFound)]
  public async Task<ActionResult<TournamentDbModel>> GetOneTournament(string id)
  {
    if (string.IsNullOrEmpty(id))
    {
      return BadRequest();
    }
    var tournament =  await _tournamentsRepository.GetOneTournament(id);
    if (tournament is null)
    {
      return NotFound();
    }

    return tournament;
  }

  [HttpDelete("delete/{id}")]
  [ProducesResponseType(StatusCodes.Status404NotFound)]
  [ProducesResponseType(StatusCodes.Status204NoContent)]
  [ProducesResponseType(StatusCodes.Status200OK)]
  public async Task<ActionResult<TournamentDbModel>> RemoveOne(string id)
  {
    var tournament = _tournamentsRepository.GetOneTournament(id);
    if (tournament is null)
    {
      return NotFound();
    }
    await _tournamentsRepository.DeleteOneTournament(id);
    return Ok();
  }

  [HttpPut("update/{id}")]
  [ProducesResponseType(StatusCodes.Status400BadRequest)]
  [ProducesResponseType(StatusCodes.Status404NotFound)]
  [ProducesResponseType(StatusCodes.Status200OK)]
  public async Task<ActionResult<TournamentDbModel>> UpdateOne(string id, TournamentDbModel tournament)
  {
    var Tournament = _tournamentsRepository.GetOneTournament(id);
    if (Tournament is null)
    {
      return NotFound();  
    }
    await _tournamentsRepository.UpdateTournament(id, tournament);
    return tournament;
  }
 }