using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using SC2Clanwars.DbContextModels;
using SC2Clanwars.Mappers;
using SC2Clanwars.Models;
using SC2Clanwars.Repositories;

namespace SC2Clanwars.Controllers;
[Authorize]
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
   return await _tournamentsRepository.GetAllTournaments();
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
    return NoContent();
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