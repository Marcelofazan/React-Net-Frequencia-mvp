using Aplicacao.Common.Interfaces;
using Aplicacao.DTO;
using MediatR;

namespace Aplicacao.Registros.Commands.UpdateRegistro
{

    public sealed class UpdateRegistroCommandHandler(IRegistroRepository repository, ICurrentUser currentUser)
        : IRequestHandler<UpdateRegistroCommand, RegistroDto>
    {
        public async Task<RegistroDto> Handle(UpdateRegistroCommand request, CancellationToken ct)
        {
            var registro = await repository.ObterPorIdAsync(currentUser.Id, request.Id, ct)
                ?? throw new KeyNotFoundException($"Registro {request.Id} não encontrado.");

            registro.Atualizar(
                request.Empresa,
                request.Cnpj,
                request.Local,
                request.NomeFuncionario,
                request.DataPonto,
                request.HorarioPonto);

            var atualizado = await repository.AtualizarAsync(registro, ct);
            return atualizado.ToDto();
        }
    }

}
