using Dominio.Entidades;

namespace Aplicacao.Common.Interfaces
{
    public interface IRegistroRepository
    {
        Task<(IReadOnlyList<RegistroPonto> Itens, int Total)> ObterTodosAsync(Guid usuarioId, DateOnly? dataInicio, DateOnly? dataFim, string? empresa, int pagina, int tamanhoPagina, CancellationToken ct = default);
        Task<RegistroPonto?> ObterPorIdAsync(Guid usuarioId, Guid id, CancellationToken ct = default);
        Task<IEnumerable<RegistroPonto>> ObterPorDataAsync(Guid usuarioId, DateOnly data, CancellationToken ct = default);
        Task<RegistroPonto> CriarAsync(RegistroPonto registro, CancellationToken ct = default);
        Task<RegistroPonto> AtualizarAsync(RegistroPonto registro, CancellationToken ct = default);
        Task DeletarAsync(Guid id, CancellationToken ct = default);
    }

}
