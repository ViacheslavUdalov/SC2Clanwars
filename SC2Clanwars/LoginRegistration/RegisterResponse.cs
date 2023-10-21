namespace SC2Clanwars.LoginRegistration;

public class RegisterResponse
{
    public string Message { get; set; } = string.Empty;
    public bool Success { get; set; }
    public string AccessToken { get; set; } = string.Empty;
    public DateTime AccessTokenExpires { get; set; }
    public string UserId { get; set; } = string.Empty;
}