using Aplicacao.Common.Interfaces;
using Aplicacao.DTO;
using Dominio.Entidades;
using MediatR;

namespace Aplicacao.Auth.Commands.Register
{
    public sealed class RegisterCommandHandler(
        IUsuarioRepository repository,
        IPasswordHasher passwordHasher,
        IJwtTokenGenerator tokenGenerator)
        : IRequestHandler<RegisterCommand, AuthResponseDto>
    {
        public async Task<AuthResponseDto> Handle(RegisterCommand request, CancellationToken ct)
        {
            var email = request.Email.Trim().ToLowerInvariant();

            if (await repository.EmailExisteAsync(email, ct))
                throw new InvalidOperationException("Já existe uma conta com este e-mail.");

            var usuario = Usuario.Criar(
                request.Nome.Trim(),
                email,
                passwordHasher.Hash(request.Senha));

            var criado = await repository.CriarAsync(usuario, ct);
            var token = tokenGenerator.Gerar(criado);

            return new AuthResponseDto(token, new UsuarioDto(criado.Id, criado.Nome, criado.Email));
        }
    }

}
