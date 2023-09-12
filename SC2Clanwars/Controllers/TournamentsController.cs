// using Microsoft.AspNetCore.Mvc;
// using Microsoft.AspNetCore.SignalR;
// using SC2Clanwars.Hubs;
//
// namespace SC2Clanwars.Controllers;
// [ApiController]
// [Route("api/[controller]")]
// public class TournamentsController : ControllerBase
// {
//     private readonly IHubContext<TournamentsHub> _tournamentHub;
//     // private readonly IBookingService _bookingService;
//     public TournamentsController(IHubContext<TournamentsHub> tournamentHub)
//     {
//         _tournamentHub = tournamentHub;
//     }
//         [HttpGet]
//     [Route("/tournaments")]
//     public async IActionResult()
//     {
//         await _tournamentHub.Clients.All("SendTournamentData");
//         return Ok(new { Message = "Synchronized" })
//     }
//     
// }