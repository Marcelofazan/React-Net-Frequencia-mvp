using Aplicacao.Common.Interfaces;
using Aplicacao.DTO;
using MediatR;

namespace Aplicacao.Registros.Queries.GettAllRegistros
{
    public sealed class GetAllRegistrosQueryHandler(IRegistroRepository repository, ICurrentUser currentUser)
        : IRequestHandler<GetAllRegistrosQuery, PagedResult<RegistroDto>>
    {
        public async Task<PagedResult<RegistroDto>> Handle(GetAllRegistrosQuery request, CancellationToken ct)
        {
            var pagina = request.Pagina < 1 ? 1 : request.Pagina;
            var tamanhoPagina = request.TamanhoPagina is < 1 or > 100 ? 10 : request.TamanhoPagina;

            var (registros, total) = await repository.ObterTodosAsync(
                currentUser.Id, request.DataInicio, request.DataFim, request.Empresa, pagina, tamanhoPagina, ct);

            var totalPaginas = (int)Math.Ceiling(total / (double)tamanhoPagina);

            return new PagedResult<RegistroDto>(
                registros.Select(r => r.ToDto()).ToList(),
                total,
                pagina,
                tamanhoPagina,
                totalPaginas);
        }
    }

}
