using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using SC2Clanwars.DbContextModels;

namespace SC2Clanwars.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthenticationController : ControllerBase
{
    private readonly ILogger<AuthenticationController> _logger;
    private UserManager<ApplicationUser> _userManager;
    private IMongoCollection<UserModel> _mongoCollection;

    public AuthenticationController(
        UserManager<ApplicationUser> userManager, ILogger<AuthenticationController> logger, IMongoCollection<UserModel> mongoCollection)
    {
        _userManager = userManager;
        _logger = logger;
        _mongoCollection = mongoCollection;
    }

    [HttpPost("")]
    public async Task<IActionResult> CreateUser(UserModel user)
    {
        if (ModelState.IsValid)
        {
            ApplicationUser appUser = new ApplicationUser
            {
                UserName = user.Name,
                Email = user.Email,
            };
            
            IdentityResult result = await _userManager.CreateAsync(appUser, user.Password);
            if (result.Succeeded)
            {
                _logger.LogInformation("User created successfully!");
                var mongoUser = new UserModel
                {
                    Name = user.Name,
                    Email = user.Email,
                    Password = user.Password
                };
                await _mongoCollection.InsertOneAsync(mongoUser);
                return Ok(user);
            }
            else
            {
                foreach (IdentityError error in result.Errors)
                {
                    ModelState.AddModelError("", error.Description);

                }
            }
        }
        return BadRequest(ModelState);
    }
}
//await _mongoCollection.InsertOneAsync(user);