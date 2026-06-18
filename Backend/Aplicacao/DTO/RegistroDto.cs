
namespace Aplicacao.DTO;

public record RegistroDto(
    Guid Id,
    string Empresa,
    string Cnpj,
    string Local,
    string NomeFuncionario,
    DateOnly DataPonto,
    TimeOnly HorarioPonto,
    string ImagemUrl,
    string Status,
    DateTime CriadoEm,
    DateTime? AtualizadoEm
);
