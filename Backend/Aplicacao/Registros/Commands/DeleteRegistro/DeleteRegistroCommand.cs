using MediatR;

namespace Aplicacao.Registros.Commands.DeleteRegistro
{
    public record DeleteRegistroCommand(Guid Id) : IRequest;
}
