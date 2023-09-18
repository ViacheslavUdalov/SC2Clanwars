using SC2Clanwars.Configuration;
using SC2Clanwars.Hubs;
using SC2Clanwars.Mappers;
using SC2Clanwars.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();
builder.Services.AddMongoDbDependencies("mongodb+srv://outline:zxcv1234@outlinevpn.6qztdyi.mongodb.net/", "Sc2ClanWars");
builder.Services.AddScoped<TournamentsRepository>();
builder.Services.AddScoped<ITournamentsMapper, TournamentsMapper>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", builder => builder
        .WithOrigins("http://localhost:4200")
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials());
});
builder.Services.AddControllers();

var app = builder.Build();

app.MapGet("/", () => "Hello World!");
app.UseHttpsRedirection();
app.UseCors("CorsPolicy");
app.MapHub<TournamentsHub>("/tournaments-hub");
app.Run();