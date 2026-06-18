using Aplicacao.Common.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace ControlePresenca.Services
{
    public sealed class CurrentUser(IHttpContextAccessor httpContextAccessor) : ICurrentUser
    {
        public Guid Id
        {
            get
            {
                var sub = httpContextAccessor.HttpContext?.User.FindFirstValue(JwtRegisteredClaimNames.Sub)
                    ?? httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);

                return Guid.TryParse(sub, out var id)
                    ? id
                    : throw new UnauthorizedAccessException("Usuário não autenticado.");
            }
        }
    }
}
