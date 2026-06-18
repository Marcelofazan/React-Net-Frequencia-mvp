
namespace Aplicacao.Common.Interfaces;

public interface IStorageService
{
    Task<(string Url, string Path)> UploadImagemAsync(Stream stream, string nomeArquivo, string contentType, CancellationToken ct = default);
    Task DeletarImagemAsync(string path, CancellationToken ct = default);
}
