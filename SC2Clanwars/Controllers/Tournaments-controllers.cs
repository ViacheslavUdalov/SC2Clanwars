using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using MongoDB.Driver;
using SC2Clanwars.DbContextModels;
using SC2Clanwars.Hubs;
using SC2Clanwars.Mappers;
using SC2Clanwars.Models;

namespace SC2Clanwars.Controllers;
[Microsoft.AspNetCore.Components.Route("api/tournaments")]
[ApiController]
public class Tournaments_controllers : ControllerBase
{
  private readonly IHubContext<TournamentsHub> _hubContext;
  private readonly IMongoCollection<TournamentDbModel> _tournamentsCollection;
  private readonly ITournamentsMapper _tournamentsMapper;

  public Tournaments_controllers(IHubContext<TournamentsHub> hubContext,
    IMongoDatabase database,
    ITournamentsMapper tournamentsMapper)
  {
    _hubContext = hubContext;
    _tournamentsCollection = database.GetCollection<TournamentDbModel>("tournaments");
    _tournamentsMapper = tournamentsMapper;
  }

  [HttpPost]
  public async Task<IActionResult> CreateTournament(TournamentModel tournament)
  {
    var tournamentModel = _tournamentsMapper.MapTournamentDbModel(tournament);
    await _tournamentsCollection.InsertOneAsync(tournamentModel);
    await _hubContext.Clients.All.SendAsync("ReceiveTournaments", tournament);
    
    return Ok(tournament);
  }
  
}