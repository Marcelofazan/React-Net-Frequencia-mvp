using Aplicacao.DTO;
using MediatR;

namespace Aplicacao.Registros.Queries.GettAllRegistros
{
    public record GetAllRegistrosQuery(
        DateOnly? DataInicio,
        DateOnly? DataFim,
        string? Empresa,
        int Pagina,
        int TamanhoPagina
    ) : IRequest<PagedResult<RegistroDto>>;

}
