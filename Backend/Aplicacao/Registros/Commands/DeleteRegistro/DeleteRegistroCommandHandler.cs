using Aplicacao.Common.Interfaces;
using MediatR;

namespace Aplicacao.Registros.Commands.DeleteRegistro
{
    public sealed class DeleteRegistroCommandHandler(
        IRegistroRepository repository,
        IStorageService storage,
        ICurrentUser currentUser)
        : IRequestHandler<DeleteRegistroCommand>
    {
        public async Task Handle(DeleteRegistroCommand request, CancellationToken ct)
        {
            var registro = await repository.ObterPorIdAsync(currentUser.Id, request.Id, ct)
                ?? throw new KeyNotFoundException($"Registro {request.Id} não encontrado.");

            await storage.DeletarImagemAsync(registro.ImagemPath, ct);
            await repository.DeletarAsync(request.Id, ct);
        }
    }

}
