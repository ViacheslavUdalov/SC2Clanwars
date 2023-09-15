using Microsoft.AspNetCore.SignalR;
using SC2Clanwars.Repositories;

namespace SC2Clanwars.Hubs;

public class TournamentsHub : Hub
{
    private readonly TournamentsRepository _tournamentsRepository;

    public TournamentsHub(TournamentsRepository tournamentsRepository)
    {
        _tournamentsRepository = tournamentsRepository;
    }

    public async Task GetTournaments()
    {
        var tournaments = await _tournamentsRepository.GetAllTournaments();
        await Clients.All.SendAsync("ReceiveTournament", tournaments);
    }
}