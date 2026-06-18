using Aplicacao.DTO;
using MediatR;

namespace Aplicacao.Registros.Commands.UpdateRegistro
{
    public record UpdateRegistroCommand(
        Guid Id,
        string Empresa,
        string Cnpj,
        string Local,
        string NomeFuncionario,
        DateOnly DataPonto,
        TimeOnly HorarioPonto
    ) : IRequest<RegistroDto>;

}
