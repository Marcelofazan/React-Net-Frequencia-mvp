using Aplicacao.Common.Interfaces;
using Aplicacao.DTO;
using MediatR;

namespace Aplicacao.Registros.Queries.GetRegistrosByDate
{
    public sealed class GetRegistrosByDateQueryHandler(IRegistroRepository repository, ICurrentUser currentUser)
        : IRequestHandler<GetRegistrosByDateQuery, IEnumerable<RegistroDto>>
    {
        public async Task<IEnumerable<RegistroDto>> Handle(GetRegistrosByDateQuery request, CancellationToken ct)
        {
            var registros = await repository.ObterPorDataAsync(currentUser.Id, request.Data, ct);
            return registros.Select(r => r.ToDto());
        }
    }
}