using Aplicacao.Common.Interfaces;
using Dominio.Entidades;
using Microsoft.EntityFrameworkCore;

namespace InfraEstrutura.Repositorios
{
    public sealed class RegistroRepository(AppDbContext context) : IRegistroRepository
    {
        public async Task<(IReadOnlyList<RegistroPonto> Itens, int Total)> ObterTodosAsync(
            Guid usuarioId, DateOnly? dataInicio, DateOnly? dataFim, string? empresa, int pagina, int tamanhoPagina, CancellationToken ct = default)
        {
            var query = context.RegistrosPonto.Where(r => r.UsuarioId == usuarioId);

            if (dataInicio.HasValue)
                query = query.Where(r => r.DataPonto >= dataInicio.Value);

            if (dataFim.HasValue)
                query = query.Where(r => r.DataPonto <= dataFim.Value);

            if (!string.IsNullOrWhiteSpace(empresa))
                query = query.Where(r => r.Empresa.ToLower().Contains(empresa.ToLower()));

            var total = await query.CountAsync(ct);

            var itens = await query
                .OrderByDescending(r => r.DataPonto)
                .ThenByDescending(r => r.HorarioPonto)
                .Skip((pagina - 1) * tamanhoPagina)
                .Take(tamanhoPagina)
                .ToListAsync(ct);

            return (itens, total);
        }

        public async Task<RegistroPonto?> ObterPorIdAsync(Guid usuarioId, Guid id, CancellationToken ct = default) =>
            await context.RegistrosPonto
                .FirstOrDefaultAsync(r => r.Id == id && r.UsuarioId == usuarioId, ct);

        public async Task<IEnumerable<RegistroPonto>> ObterPorDataAsync(Guid usuarioId, DateOnly data, CancellationToken ct = default) =>
            await context.RegistrosPonto
                .Where(r => r.UsuarioId == usuarioId && r.DataPonto == data)
                .OrderBy(r => r.HorarioPonto)
                .ToListAsync(ct);

        public async Task<RegistroPonto> CriarAsync(RegistroPonto registro, CancellationToken ct = default)
        {
            context.RegistrosPonto.Add(registro);
            await context.SaveChangesAsync(ct);
            return registro;
        }

        public async Task<RegistroPonto> AtualizarAsync(RegistroPonto registro, CancellationToken ct = default)
        {
            context.RegistrosPonto.Update(registro);
            await context.SaveChangesAsync(ct);
            return registro;
        }

        public async Task DeletarAsync(Guid id, CancellationToken ct = default)
        {
            await context.RegistrosPonto
                .Where(r => r.Id == id)
                .ExecuteDeleteAsync(ct);
        }
    }

}
