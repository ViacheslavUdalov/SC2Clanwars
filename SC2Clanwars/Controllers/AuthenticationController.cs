using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SC2Clanwars.DbContextModels;
using SC2Clanwars.LoginRegistration;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace SC2Clanwars.Controllers;

[ApiController]
[Route("api/authentication")]
public class AuthenticationController : ControllerBase
{
    private UserManager<ApplicationUser> _userManager;
    private RoleManager<ApplicationRole> _roleManager;

    public AuthenticationController(
        UserManager<ApplicationUser> userManager, 
        RoleManager<ApplicationRole> roleManager)
    {
        _userManager = userManager;
        _roleManager = roleManager;
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
        try
        {

            // Находим пользователя по email
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user is null) return new LoginResponse { Message = "Invalid email or password", Success = false };
            // утверждения о пользователе, содержащие информацию о пользователе
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            };
            // роль пользователя
            var roles = await _userManager.GetRolesAsync(user);
            var roleClaims = roles.Select(x => new Claim(ClaimTypes.Role, x));
            claims.AddRange(roleClaims);
            // ключ для подписи JWT-токена
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("1swek3u4uo2u4a6e"));
            // параметры подписи токена
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            // срок действия токена
            var expires = DateTime.Now.AddDays(30);
            // генерация нового токена
            var token = new JwtSecurityToken(
                issuer: "http://localhost:5034",
                audience: "http://localhost:5034",
                claims: claims,
                expires: expires,
                signingCredentials: creds
            );
            //  Возвращается объект, в который включается сгенерированный JWT-токен, сообщение, email пользователя,
            // идентификатор пользователя и флаг Success,
            // который указывает на успешность операции аутентификации.
            return new LoginResponse
            {
                AccessToken = new JwtSecurityTokenHandler().WriteToken(token),
                Message = "Loging Successfully",
                Email = user?.Email,
                Success = true,
                UserId = user?.Id.ToString(),
                AccessTokenExpires = expires
            };
        }
        catch (Exception exception)
        {
            Console.WriteLine(exception.Message);
            return new LoginResponse
            {
                Success = false,
                Message = exception.Message
            };
        }
    }

    [HttpPost("register")]

    [ProducesResponseType((int)HttpStatusCode.OK, Type = typeof(RegisterResponse))]

    public async Task<IActionResult> Register([FromBody] RegistrationRequest request)
    {
        var result = await RegisterAsync(request);
        return result.Success ? Ok(result) : BadRequest(result.Message);
    }

    private async Task<RegisterResponse> RegisterAsync(RegistrationRequest request)
    {
        try
        {
            // проверяет, существует ли пользователь с таким email уже
            var existUser = await _userManager.FindByEmailAsync(request.Email);
            if (existUser != null) return new RegisterResponse { Success = false,
                Message = "User with this email already exist!" 
            };
            
            // создаётся новый пользователь
            existUser = new ApplicationUser
            {
                Email = request.Email,
                ConcurrencyStamp = Guid.NewGuid().ToString(),
                UserName = request.UserName,
                FullName = request.FullName
            };
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, existUser.Id.ToString()),
                new Claim(ClaimTypes.Name, existUser.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, existUser.Id.ToString())
            };
            // добавляется в базу данных
            IdentityResult  createUserResult = await _userManager.CreateAsync(existUser, request.Password);
            if (!createUserResult.Succeeded)
                return new RegisterResponse
                {
                    Success = false,
                    Message = $"Create user failed {createUserResult?.Errors.First()?.Description}"
                };
                    // добавление роли
            var addUserRoleResult = await _userManager.AddToRoleAsync(existUser, "USER");
            if (!addUserRoleResult.Succeeded)
                return new RegisterResponse
                {
                    Success = false,
                    Message = $"Create user successed, but could not add user to role" +
                              $" {createUserResult?.Errors.First()?.Description}"
                };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("1swek3u4uo2u4a6e"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(30);
            var token = new JwtSecurityToken(
                issuer: "http://localhost:5034",
                audience: "http://localhost:5034",
                claims: claims,
                expires: expires,
                signingCredentials: creds
            );
            var accessToken = new JwtSecurityTokenHandler().WriteToken(token);
            return new RegisterResponse
            {
                AccessToken = accessToken,
                Success = true,
                Message = "User register successfully",
                AccessTokenExpires = expires,
                UserId = existUser?.Id.ToString(),
            };
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return new RegisterResponse
            {
                Success = false,
                Message = e.Message
            };
        }    
    }

    [HttpPost("roles/add")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> CreateRole([FromBody] CreateRoleRequest request)
    {
        var appRole = new ApplicationRole
        {
            Name = request.Role
        };
        var createRole = await _roleManager.CreateAsync(appRole);
        return Ok(new { message = "role created successfully!" });
    }
}
