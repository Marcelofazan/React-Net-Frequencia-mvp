using Aplicacao.Common.Interfaces;

namespace InfraEstrutura.Servicos
{
    public sealed class BCryptPasswordHasher : IPasswordHasher
    {
        public string Hash(string senha) => BCrypt.Net.BCrypt.HashPassword(senha);

        public bool Verificar(string senha, string hash) => BCrypt.Net.BCrypt.Verify(senha, hash);
    }

}
