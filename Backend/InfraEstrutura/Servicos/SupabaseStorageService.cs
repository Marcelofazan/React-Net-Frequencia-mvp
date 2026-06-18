using Aplicacao.Common.Interfaces;
using Microsoft.Extensions.Configuration;

namespace InfraEstrutura.Servicos
{
    public sealed class SupabaseStorageService(HttpClient httpClient, IConfiguration configuration) : IStorageService
    {
        private readonly string _supabaseUrl = NormalizarUrl(configuration["Supabase:Url"]
            ?? throw new InvalidOperationException("Supabase:Url não configurado."));
        private readonly string _serviceKey = (configuration["Supabase:ServiceKey"]
            ?? throw new InvalidOperationException("Supabase:ServiceKey não configurado.")).Trim();
        private readonly string _bucket = (configuration["Supabase:Bucket"] ?? "comprovantes").Trim();

        private static string NormalizarUrl(string valor)
        {
            var idx = valor.IndexOf("http", StringComparison.OrdinalIgnoreCase);
            return (idx >= 0 ? valor[idx..] : $"https://{valor}").Trim().TrimEnd('/');
        }

        public async Task<(string Url, string Path)> UploadImagemAsync(
            Stream stream, string nomeArquivo, string contentType, CancellationToken ct = default)
        {
            var extensao = Path.GetExtension(nomeArquivo);
            var path = $"{Guid.NewGuid()}{extensao}";

            // Criando o formulário multipart exigido pela API do Supabase Storage
            using var multipartContent = new MultipartFormDataContent();

            using var streamContent = new StreamContent(stream);
            streamContent.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue(contentType);

            // O Supabase precisa que o arquivo seja enviado com o nome "file"
            multipartContent.Add(streamContent, "file", path);

            var urlFinal = $"{_supabaseUrl}/storage/v1/object/{_bucket}/{path}";

            var request = new HttpRequestMessage(HttpMethod.Post, urlFinal);
            request.Headers.Add("Authorization", $"Bearer {_serviceKey}");
            request.Headers.Add("apikey", _serviceKey);
            request.Content = multipartContent;

            var response = await httpClient.SendAsync(request, ct);

            if (!response.IsSuccessStatusCode)
            {
                var erroTexto = await response.Content.ReadAsStringAsync(ct);
                // Isso força o erro a aparecer mesmo se o middleware tentar esconder
                throw new Exception($"[SUPABASE ERRO REAL]: {response.StatusCode} - {erroTexto}");
            }

            var publicUrl = $"{_supabaseUrl}/storage/v1/object/public/{_bucket}/{path}";
            return (publicUrl, path);
        }

        public async Task DeletarImagemAsync(string path, CancellationToken ct = default)
        {
            var request = new HttpRequestMessage(HttpMethod.Delete,
                $"{_supabaseUrl}/storage/v1/object/{_bucket}/{path}");
            request.Headers.Add("Authorization", $"Bearer {_serviceKey}");
            request.Headers.Add("apikey", _serviceKey);

            var response = await httpClient.SendAsync(request, ct);

            if (response.IsSuccessStatusCode)
                return;

            var corpo = await response.Content.ReadAsStringAsync(ct);
            if (response.StatusCode == System.Net.HttpStatusCode.NotFound || corpo.Contains("not_found"))
                return;

            response.EnsureSuccessStatusCode();
        }
    }
}
