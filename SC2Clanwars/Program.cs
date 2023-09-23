
namespace YourNamespace
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}

// var builder = WebApplication.CreateBuilder(args);
//
// builder.Services.AddSignalR();
// builder.Services.AddMongoDbDependencies("mongodb+srv://outline:zxcv1234@outlinevpn.6qztdyi.mongodb.net/", "Sc2ClanWars");
// builder.Services.AddScoped<TournamentsRepository>();
// builder.Services.AddScoped<ITournamentsMapper, TournamentsMapper>();
// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("CorsPolicy", builder => builder
//         .WithOrigins("http://localhost:4200")
//         .AllowAnyMethod()
//         .AllowAnyHeader()
//         .AllowCredentials());
// });
// builder.Services.AddControllers();
//
// var app = builder.Build();
//
// app.MapGet("/", () => "Hello World!");
// app.UseHttpsRedirection();
// app.UseCors("CorsPolicy");
// app.MapHub<TournamentsHub>("/tournaments-hub");
// app.Run();