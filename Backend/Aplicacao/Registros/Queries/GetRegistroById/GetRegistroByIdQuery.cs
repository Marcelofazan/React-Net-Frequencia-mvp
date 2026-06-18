using Aplicacao.DTO;
using MediatR;

namespace Aplicacao.Registros.Queries.GetRegistrosByDate
{
    public record GetRegistrosByDateQuery(DateOnly Data) : IRequest<IEnumerable<RegistroDto>>;
}
