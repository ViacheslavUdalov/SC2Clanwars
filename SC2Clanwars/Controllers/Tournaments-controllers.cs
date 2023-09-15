using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SC2Clanwars.Hubs;
using SC2Clanwars.Models;

namespace SC2Clanwars.Controllers;
[Microsoft.AspNetCore.Components.Route("api/tournaments")]
[ApiController]
public class Tournaments_controllers : ControllerBase
{
  private readonly IHubContext<TournamentsHub> _hubContext;

  public Tournaments_controllers(IHubContext<TournamentsHub> hubContext)
  {
    _hubContext = hubContext;
  }

  [HttpPost("create-tournament")]
  public async Task<IActionResult> CreateTournament(TournamentModel tournament)
  {
    await _hubContext.Clients.All.SendAsync("ReceiveTournaments", tournament);
    return Ok(tournament);
  }
  
}