using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using SC2Clanwars.DbContextModels;
using SC2Clanwars.Repositories;

namespace SC2Clanwars.Controllers;
[Authorize]
[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly UsersRepository _usersRepository;

    public UsersController(UsersRepository usersRepository)
    {
        _usersRepository = usersRepository;
    }
    
[HttpGet("getallusers")]
[ProducesResponseType(StatusCodes.Status200OK)]
public async Task<ActionResult<List<ApplicationUser>>> GetAllUsers()
    {
        var users = await _usersRepository.GetAllUserAsync();
        return users;
    }
    
    [HttpGet("getoneuser/{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    // требует именно Guid id, потому что коллекция IMongoIdentity реализова через айди типа Guid
    public async Task<ActionResult<ApplicationUser>> GetOneUser(Guid id)
    {
        if (id == Guid.Empty)
        {
            return BadRequest();
        }
        var user = await _usersRepository.GetOneUserAsync(id);
        if (user is null)
        {
            return NotFound();
        }
        return user;
    }
    [HttpDelete("delete/{id}")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<TournamentDbModel>> RemoveOne(Guid id)
    {
        var user = _usersRepository.DeleteOneUserAsync(id);
        if (user is null)
        {
            return NotFound();
        }
        await _usersRepository.DeleteOneUserAsync(id);
        return NoContent();
    }

    [HttpPut("update/{id}")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<ApplicationUser>> UpdateOne(Guid id, ApplicationUser user)
    {
        var userUpdate = _usersRepository.GetOneUserAsync(id);
        if (userUpdate is null)
        {
            return NotFound();  
        }
        await _usersRepository.UpdateUserAsync(id, user);
        return user;
    }
}