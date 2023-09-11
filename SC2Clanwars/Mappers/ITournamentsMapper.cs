using SC2Clanwars.DbContextModels;
using SC2Clanwars.Models;

namespace SC2Clanwars.Mappers;

public interface ITournamentsMapper
{
    public TournamentModel MapTournamentModel(TournamentDbModel tournamentDbModel);
}