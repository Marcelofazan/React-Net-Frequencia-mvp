using Dominio.Entidades;

namespace Aplicacao.DTO;

public static class RegistroMappingExtensions
{
    public static RegistroDto ToDto(this RegistroPonto registro) =>
        new(
            registro.Id,
            registro.Empresa,
            registro.Cnpj,
            registro.Local,
            registro.NomeFuncionario,
            registro.DataPonto,
            registro.HorarioPonto,
            registro.ImagemUrl,
            registro.Status.ToString(),
            registro.CriadoEm,
            registro.AtualizadoEm
        );
}
