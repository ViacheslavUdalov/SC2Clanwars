using System.Text;
using AspNetCore.Identity.MongoDbCore.Extensions;
using AspNetCore.Identity.MongoDbCore.Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using SC2Clanwars.Configuration;
using SC2Clanwars.DbContextModels;
using SC2Clanwars.Hubs;
using SC2Clanwars.Repositories;
using SC2Clanwars.SignalRModel;

namespace SC2Clanwars
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddDirectoryBrowser();

            services.AddMongoDbDependencies("mongodb+srv://outline:zxcv1234@outlinevpn.6qztdyi.mongodb.net/",
                "Sc2ClanWars");
            services.AddScoped<TournamentsRepository>();
            // ниже добавляем именно так колекцию, потому что иначе выдаёт ошибку 
            // Unable to resolve service for type 'MongoDB.Driver.IMongoCollection
            // а затем регистрируем репозиторий
            services.AddScoped<IMongoCollection<ApplicationUser>>(provider =>
            {
                var database = provider.GetRequiredService<IMongoDatabase>();
                return database.GetCollection<ApplicationUser>("Users");
            });
            services.AddScoped<IMongoCollection<ChatMessageInTeam>>(provider =>
            {
                var database = provider.GetRequiredService<IMongoDatabase>();
                return database.GetCollection<ChatMessageInTeam>("ChatMessage");
            });
            services.AddScoped<UsersRepository>();
            services.AddScoped<TeamsRepository>();
            // services.AddScoped<ITournamentsMapper, TournamentsMapper>();

            var mongoDbIdentityConfig = new MongoDbIdentityConfiguration
            {
                MongoDbSettings = new MongoDbSettings
                {
                    ConnectionString = "mongodb+srv://outline:zxcv1234@outlinevpn.6qztdyi.mongodb.net/",
                    DatabaseName = "Sc2ClanWars"
                },
                IdentityOptionsAction = options =>
                {
                    // Password Option
                    options.Password.RequireDigit = false;
                    options.Password.RequiredLength = 8;
                    options.Password.RequireLowercase = false;
                    options.Password.RequireUppercase = false;
                    options.Password.RequireNonAlphanumeric = false;

                    // lockout
                    // нужны для блокировки пользователя,
                    // первое - на какое время блок, второе - количество попыток входа
                    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(10);
                    options.Lockout.MaxFailedAccessAttempts = 5;

                    // Required email
                    options.User.RequireUniqueEmail = true;
                }
            };
            services.ConfigureMongoDbIdentity<ApplicationUser, ApplicationRole, Guid>(mongoDbIdentityConfig)
                .AddUserManager<UserManager<ApplicationUser>>()
                .AddSignInManager<SignInManager<ApplicationUser>>()
                .AddRoleManager<RoleManager<ApplicationRole>>()
                .AddDefaultTokenProviders();
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = true;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidIssuer = "http://localhost:5034",
                    ValidAudience = "http://localhost:5034",
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("1swek3u4uo2u4a6e")),
                    ClockSkew = TimeSpan.Zero
                };
            });
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", builder => builder
                    .WithOrigins("http://localhost:4200")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials()
                );
            });
            services.AddSignalR();
            // регистрируем именно так, без new
            services.AddSingleton<Dictionary<string, UserRoomConnection>>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();
            app.UseCors("CorsPolicy");
            app.UseStaticFiles();
            app.UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = new PhysicalFileProvider(
                    Path.Combine(Directory.GetCurrentDirectory(), @"StaticFiles")),
                RequestPath = new PathString("/StaticFiles")
            });
            app.UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = new PhysicalFileProvider(
                    Path.Combine(Directory.GetCurrentDirectory(), @"assets")),
                RequestPath = new PathString("/assets")
            });
            app.UseRouting();
            
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<ChatHub>("/chathub");
                endpoints.MapControllers();
            });
        }
    }
}