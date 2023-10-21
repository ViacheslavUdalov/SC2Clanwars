using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SC2Clanwars.DbContextModels;
using SC2Clanwars.Repositories;

namespace SC2Clanwars.Controllers;
[Authorize]
[ApiController]
[Route("api/[controller]")]
public class TournamentsController : ControllerBase
{
  private readonly TournamentsRepository _tournamentsRepository;
  public TournamentsController(TournamentsRepository tournamentsRepository)
  {
    _tournamentsRepository = tournamentsRepository;
  }
  [HttpPost("create")]
  [ProducesResponseType(StatusCodes.Status404NotFound)]
  [ProducesResponseType(StatusCodes.Status200OK)]
  public async Task<ActionResult<TournamentDbModel>> CreateTournamentRepository(TournamentDbModel tournament)
  {
   var tournamentModel =  await _tournamentsRepository.CreateTournament(tournament);
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
   return await _tournamentsRepository.GetAllTournamentsAsync();
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
    var tournament =  await _tournamentsRepository.GetOneTournamentAsync(id);
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
    var tournament = _tournamentsRepository.GetOneTournamentAsync(id);
    if (tournament is null)
    {
      return NotFound();
    }
    await _tournamentsRepository.DeleteOneTournamentAsync(id);
    return NoContent();
  }

  [HttpPut("update/{id}")]
  [ProducesResponseType(StatusCodes.Status400BadRequest)]
  [ProducesResponseType(StatusCodes.Status404NotFound)]
  [ProducesResponseType(StatusCodes.Status200OK)]
  public async Task<ActionResult<TournamentDbModel>> UpdateOne(string id, TournamentDbModel tournament)
  {
    var Tournament = _tournamentsRepository.GetOneTournamentAsync(id);
    if (Tournament is null)
    {
      return NotFound();  
    }
    await _tournamentsRepository.UpdateTournamentAsync(id, tournament);
    return tournament;
  }
 }