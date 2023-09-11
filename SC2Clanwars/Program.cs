using SC2Clanwars.Configuration;
using SC2Clanwars.Hubs;
using SC2Clanwars.Mappers;
using SC2Clanwars.Repositories;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSignalR();
builder.Services.AddMongoDbDependencies("mongodb+srv://outline:zxcv1234@outlinevpn.6qztdyi.mongodb.net/", "Sc2ClanWars");
builder.Services.AddScoped<TournamentsRepository>();
builder.Services.AddScoped<ITournamentsMapper, TournamentsMapper>();
var app = builder.Build();

app.MapGet("/", () => "Hello World!");
app.UseHttpsRedirection();
app.MapHub<TournamentsHub>("tournaments-hub");
app.Run();