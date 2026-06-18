using Dominio.Entidades;

namespace Aplicacao.Common.Interfaces
{
    public interface IJwtTokenGenerator
    {
        string Gerar(Usuario usuario);
    }
}
