using Aplicacao.Common.Interfaces;
using InfraEstrutura.Repositorios;
using InfraEstrutura.Servicos;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace InfraEstrutura
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<AppDbContext>(options =>
                options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));

            services.AddScoped<IRegistroRepository, RegistroRepository>();
            services.AddScoped<IUsuarioRepository, UsuarioRepository>();

            services.AddSingleton<IPasswordHasher, BCryptPasswordHasher>();
            services.AddSingleton<IJwtTokenGenerator, JwtTokenGenerator>();

            services.AddHttpClient<IStorageService, SupabaseStorageService>();

            return services;
        }
    }

}
