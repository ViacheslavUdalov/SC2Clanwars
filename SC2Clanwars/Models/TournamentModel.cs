namespace SC2Clanwars.Models;

    public class TournamentModel
    {
        public string Name { get; set; }
        public string? PrizePool { get; set; }
        public TeamModel[]? Teams { get; set; }
        public string? Avatar { get; set; }
    }