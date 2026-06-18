
namespace Aplicacao.DTO;

public record UsuarioDto(
    Guid Id,
    string Nome,
    string Email
);

public record AuthResponseDto(
    string Token,
    UsuarioDto Usuario
);
