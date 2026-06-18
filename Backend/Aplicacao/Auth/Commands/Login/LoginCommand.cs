using Aplicacao.DTO;
using MediatR;

namespace Aplicacao.Auth.Commands.Login
{
    public record LoginCommand(
        string Email,
        string Senha
    ) : IRequest<AuthResponseDto>;

}
