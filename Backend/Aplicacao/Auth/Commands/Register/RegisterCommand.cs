using Aplicacao.DTO;
using MediatR;

namespace Aplicacao.Auth.Commands.Register
{
    public record RegisterCommand(
        string Nome,
        string Email,
        string Senha
    ) : IRequest<AuthResponseDto>;

}
