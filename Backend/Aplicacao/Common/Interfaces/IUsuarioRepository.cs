using Dominio.Entidades;

namespace Aplicacao.Common.Interfaces
{
    public interface IUsuarioRepository
    {
        Task<Usuario?> ObterPorEmailAsync(string email, CancellationToken ct = default);
        Task<bool> EmailExisteAsync(string email, CancellationToken ct = default);
        Task<Usuario> CriarAsync(Usuario usuario, CancellationToken ct = default);
    }

}
