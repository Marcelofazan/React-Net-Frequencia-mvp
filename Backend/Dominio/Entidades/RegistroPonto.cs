using Dominio.Enums;

namespace Dominio.Entidades
{
    public class RegistroPonto
    {
        public Guid Id { get; private set; }
        public Guid UsuarioId { get; private set; }
        public string Empresa { get; private set; } = string.Empty;
        public string Cnpj { get; private set; } = string.Empty;
        public string Local { get; private set; } = string.Empty;
        public string NomeFuncionario { get; private set; } = string.Empty;
        public DateOnly DataPonto { get; private set; }
        public TimeOnly HorarioPonto { get; private set; }
        public string ImagemUrl { get; private set; } = string.Empty;
        public string ImagemPath { get; private set; } = string.Empty;
        public StatusRegistro Status { get; private set; }
        public DateTime CriadoEm { get; private set; }
        public DateTime? AtualizadoEm { get; private set; }

        private RegistroPonto() { }

        public static RegistroPonto Criar(
            Guid usuarioId,
            string empresa,
            string cnpj,
            string local,
            string nomeFuncionario,
            DateOnly dataPonto,
            TimeOnly horarioPonto,
            string imagemUrl,
            string imagemPath)
        {
            return new RegistroPonto
            {
                Id = Guid.NewGuid(),
                UsuarioId = usuarioId,
                Empresa = empresa,
                Cnpj = cnpj,
                Local = local,
                NomeFuncionario = nomeFuncionario,
                DataPonto = dataPonto,
                HorarioPonto = horarioPonto,
                ImagemUrl = imagemUrl,
                ImagemPath = imagemPath,
                Status = StatusRegistro.Ativo,
                CriadoEm = DateTime.UtcNow
            };
        }

        public void Atualizar(
            string empresa,
            string cnpj,
            string local,
            string nomeFuncionario,
            DateOnly dataPonto,
            TimeOnly horarioPonto)
        {
            Empresa = empresa;
            Cnpj = cnpj;
            Local = local;
            NomeFuncionario = nomeFuncionario;
            DataPonto = dataPonto;
            HorarioPonto = horarioPonto;
            AtualizadoEm = DateTime.UtcNow;
        }

        public void Arquivar() => Status = StatusRegistro.Arquivado;
    }
}
