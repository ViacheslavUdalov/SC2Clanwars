using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using SC2Clanwars.DbContextModels;
using SC2Clanwars.Repositories;

namespace SC2Clanwars.Controllers;
[Authorize]
[ApiController]
[Route("api/[controller]")]
public class TeamsController : ControllerBase
{
    private readonly TeamsRepository _teamsRepository;

    public TeamsController(IMongoCollection<TeamDbModel> mongoCollection, TeamsRepository teamsRepository)
    {
        _teamsRepository = teamsRepository;
    }
    [HttpPost("create")]
  [ProducesResponseType(StatusCodes.Status404NotFound)]
  [ProducesResponseType(StatusCodes.Status200OK)]
  public async Task<ActionResult<TeamDbModel>> CreateTeam([FromBody] TeamDbModel team)
  {
    var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    if (string.IsNullOrEmpty(userId))
    {
      return Unauthorized();
    }

    if (!ModelState.IsValid)
    {
      return BadRequest(ModelState);
    }
    team.CreatorId = userId;
   var teamModel =  await _teamsRepository.CreateTeam(team);
    if (teamModel is null)
    {
      return NotFound();
    }
    return teamModel;
  }

  
  [HttpGet("")]
  [ProducesResponseType(StatusCodes.Status200OK)]
  public async Task<List<TeamDbModel>> GetAllTeams()
  {
   return await _teamsRepository.GetAllTeamsAsync();
  }

  
  [HttpGet("{id}")]
  [ProducesResponseType(StatusCodes.Status200OK)]
  [ProducesResponseType(StatusCodes.Status400BadRequest)]
  [ProducesResponseType(StatusCodes.Status404NotFound)]
  public async Task<ActionResult<TeamDbModel>> GetOneTeam(string id)
  {
    if (string.IsNullOrEmpty(id))
    {
      return BadRequest();
    }
    var team =  await _teamsRepository.GetOneTeamAsync(id);
    if (team is null)
    {
      return NotFound();
    }

    return team;
  }

  [HttpDelete("delete/{id}")]
  [ProducesResponseType(StatusCodes.Status404NotFound)]
  [ProducesResponseType(StatusCodes.Status204NoContent)]
  [ProducesResponseType(StatusCodes.Status200OK)]
  public async Task<ActionResult<TeamDbModel>> RemoveOne(string id)
  {
    var tournament = _teamsRepository.GetOneTeamAsync(id);
    if (tournament is null)
    {
      return NotFound();
    }
    await _teamsRepository.DeleteOneTeamAsync(id);
    return NoContent();
  }

  [HttpPut("update/{id}")]
  [ProducesResponseType(StatusCodes.Status400BadRequest)]
  [ProducesResponseType(StatusCodes.Status404NotFound)]
  [ProducesResponseType(StatusCodes.Status200OK)]
  public async Task<ActionResult<TeamDbModel>> UpdateOne(string id, TeamDbModel team)
  {
    var teamAsync = _teamsRepository.GetOneTeamAsync(id);
    if (teamAsync is null)
    {
      return NotFound();  
    }
    await _teamsRepository.UpdateTeamAsync(id, team);
    return team;
  }
}