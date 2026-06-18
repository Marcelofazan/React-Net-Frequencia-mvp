using Dominio.Entidades;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace InfraEstrutura.Persistencia.Configurations
{
    public sealed class RegistroPontoConfiguration : IEntityTypeConfiguration<RegistroPonto>
    {
        public void Configure(EntityTypeBuilder<RegistroPonto> builder)
        {
            builder.ToTable("registros_ponto");

            builder.HasKey(r => r.Id);

            builder.Property(r => r.Id)
                .HasColumnName("id");

            builder.Property(r => r.UsuarioId)
                .IsRequired()
                .HasColumnName("usuario_id");

            builder.Property(r => r.Empresa)
                .IsRequired()
                .HasMaxLength(200)
                .HasColumnName("empresa");

            builder.Property(r => r.Cnpj)
                .IsRequired()
                .HasMaxLength(18)
                .HasColumnName("cnpj");

            builder.Property(r => r.Local)
                .HasMaxLength(300)
                .HasColumnName("local");

            builder.Property(r => r.NomeFuncionario)
                .IsRequired()
                .HasMaxLength(200)
                .HasColumnName("nome_funcionario");

            builder.Property(r => r.DataPonto)
                .IsRequired()
                .HasColumnName("data_ponto");

            builder.Property(r => r.HorarioPonto)
                .IsRequired()
                .HasColumnName("horario_ponto");

            builder.Property(r => r.ImagemUrl)
                .IsRequired()
                .HasMaxLength(1000)
                .HasColumnName("imagem_url");

            builder.Property(r => r.ImagemPath)
                .IsRequired()
                .HasMaxLength(500)
                .HasColumnName("imagem_path");

            builder.Property(r => r.Status)
                .IsRequired()
                .HasConversion<int>()
                .HasColumnName("status");

            builder.Property(r => r.CriadoEm)
                .IsRequired()
                .HasColumnName("criado_em");

            builder.Property(r => r.AtualizadoEm)
                .HasColumnName("atualizado_em");

            builder.HasIndex(r => r.DataPonto).HasDatabaseName("ix_registros_ponto_data");
            builder.HasIndex(r => r.Empresa).HasDatabaseName("ix_registros_ponto_empresa");
            builder.HasIndex(r => r.UsuarioId).HasDatabaseName("ix_registros_ponto_usuario");

            builder.HasOne<Usuario>()
                .WithMany()
                .HasForeignKey(r => r.UsuarioId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }

}
