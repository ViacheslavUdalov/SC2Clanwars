using SC2Clanwars.Configuration;
using SC2Clanwars.Mappers;
using SC2Clanwars.Repositories;

namespace YourNamespace
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
            services.AddSignalR();
            services.AddControllers();
            services.AddMongoDbDependencies("mongodb+srv://outline:zxcv1234@outlinevpn.6qztdyi.mongodb.net/", "Sc2ClanWars");
            services.AddScoped<TournamentsRepository>();
            services.AddScoped<ITournamentsMapper, TournamentsMapper>();
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", builder => builder
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials()
                    .WithOrigins("http://localhost:4200"));
            });
            
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();
            app.UseHttpsRedirection();
            app.UseCors("CorsPolicy");
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
          
        }
        
    }
}