using System.Net;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.JsonWebTokens;
using MongoDB.Driver;
using SC2Clanwars.DbContextModels;
using SC2Clanwars.LoginRegistration;

namespace SC2Clanwars.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthenticationControllerSec : ControllerBase
{
    private readonly ILogger<AuthenticationControllerSec> _logger;
    private UserManager<ApplicationUser> _userManager;
    private IMongoCollection<UserModel> _mongoCollection;

    public AuthenticationControllerSec(
        UserManager<ApplicationUser> userManager, 
        ILogger<AuthenticationController> logger,
        IMongoCollection<UserModel> mongoCollection)
    {
        _userManager = userManager;
        _logger = logger;
        _mongoCollection = mongoCollection;
    }

    [HttpPost("login")]
    [ProducesResponseType((int) HttpStatusCode.OK,Type = typeof(LoginResponse))]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var result = await LoginAsync(request);
        return result.Success ? Ok(result) : BadRequest(result.Message);
    }

    private async Task<LoginResponse> LoginAsync(LoginRequest request)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);
        if (user is null) return new LoginResponse { Message = "Invalid email or password", Success = false };

        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
        };
        var roles = await _userManager.GetRolesAsync(user);
        var roleClaims = roles.Select(x => new Claim(ClaimTypes.Role, x));
    }
}
//await _mongoCollection.InsertOneAsync(user);