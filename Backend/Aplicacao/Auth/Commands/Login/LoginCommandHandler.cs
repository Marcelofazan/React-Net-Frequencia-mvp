using Aplicacao.Common.Interfaces;
using Aplicacao.DTO;
using MediatR;

namespace Aplicacao.Auth.Commands.Login
{
    public sealed class LoginCommandHandler(
        IUsuarioRepository repository,
        IPasswordHasher passwordHasher,
        IJwtTokenGenerator tokenGenerator)
        : IRequestHandler<LoginCommand, AuthResponseDto>
    {
        public async Task<AuthResponseDto> Handle(LoginCommand request, CancellationToken ct)
        {
            var email = request.Email.Trim().ToLowerInvariant();
            var usuario = await repository.ObterPorEmailAsync(email, ct);

            if (usuario is null || !passwordHasher.Verificar(request.Senha, usuario.SenhaHash))
                throw new UnauthorizedAccessException("E-mail ou senha inválidos.");

            var token = tokenGenerator.Gerar(usuario);
            return new AuthResponseDto(token, new UsuarioDto(usuario.Id, usuario.Nome, usuario.Email));
        }
    }

}
