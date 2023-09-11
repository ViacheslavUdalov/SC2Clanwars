using SC2Clanwars.DbContextModels;
using SC2Clanwars.Models;

namespace SC2Clanwars.Mappers;

public class TournamentsMapper : ITournamentsMapper
{
    public TournamentModel MapTournamentModel(TournamentDbModel tournamentDbModel)
    {
        return new TournamentModel
        {
            Name = tournamentDbModel.Name,
            Teams = tournamentDbModel.Teams,
            PrizePool = tournamentDbModel.PrizePool,
            Avatar = tournamentDbModel.Avatar
        };
    }
}