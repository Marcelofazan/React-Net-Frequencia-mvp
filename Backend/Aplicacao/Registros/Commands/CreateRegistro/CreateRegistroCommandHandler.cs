using Aplicacao.Common.Interfaces;
using Aplicacao.DTO;
using Dominio.Entidades;
using MediatR;

namespace Aplicacao.Registros.Commands.CreateRegistro
{
    public sealed class CreateRegistroCommandHandler(
        IRegistroRepository repository,
        IStorageService storage,
        ICurrentUser currentUser)
        : IRequestHandler<CreateRegistroCommand, RegistroDto>
    {
        public async Task<RegistroDto> Handle(CreateRegistroCommand request, CancellationToken ct)
        {
            var (url, path) = await storage.UploadImagemAsync(
                request.ImagemStream,
                request.ImagemNomeArquivo,
                request.ImagemContentType,
                ct);

            var registro = RegistroPonto.Criar(
                currentUser.Id,
                request.Empresa,
                request.Cnpj,
                request.Local,
                request.NomeFuncionario,
                request.DataPonto,
                request.HorarioPonto,
                url,
                path);

            var criado = await repository.CriarAsync(registro, ct);
            return criado.ToDto();
        }
    }

}
