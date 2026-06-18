
namespace Dominio.Entidades;
public class Usuario
{
    public Guid Id { get; private set; }
    public string Nome { get; private set; } = string.Empty;
    public string Email { get; private set; } = string.Empty;
    public string SenhaHash { get; private set; } = string.Empty;
    public DateTime CriadoEm { get; private set; }

    private Usuario() { }

    public static Usuario Criar(string nome, string email, string senhaHash)
    {
        return new Usuario
        {
            Id = Guid.NewGuid(),
            Nome = nome,
            Email = email,
            SenhaHash = senhaHash,
            CriadoEm = DateTime.UtcNow
        };
    }
}
