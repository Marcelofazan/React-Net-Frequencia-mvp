
namespace Aplicacao.DTO;

public record PagedResult<T>(
    IReadOnlyList<T> Itens,
    int Total,
    int Pagina,
    int TamanhoPagina,
    int TotalPaginas
);
