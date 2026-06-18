namespace ControlePresenca.Model;

public record CreateRegistroRequest
{
    public string Empresa { get; init; } = string.Empty;
    public string Cnpj { get; init; } = string.Empty;
    public string Local { get; init; } = string.Empty;
    public string NomeFuncionario { get; init; } = string.Empty;
    public DateOnly DataPonto { get; init; }
    public TimeOnly HorarioPonto { get; init; }
    public IFormFile Imagem { get; init; } = null!;
}
