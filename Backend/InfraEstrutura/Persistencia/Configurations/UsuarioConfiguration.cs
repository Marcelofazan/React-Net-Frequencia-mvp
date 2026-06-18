using Dominio.Entidades;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace InfraEstrutura.Persistencia.Configurations
{
    public sealed class UsuarioConfiguration : IEntityTypeConfiguration<Usuario>
    {
        public void Configure(EntityTypeBuilder<Usuario> builder)
        {
            builder.ToTable("usuarios");

            builder.HasKey(u => u.Id);

            builder.Property(u => u.Id)
                .HasColumnName("id");

            builder.Property(u => u.Nome)
                .IsRequired()
                .HasMaxLength(200)
                .HasColumnName("nome");

            builder.Property(u => u.Email)
                .IsRequired()
                .HasMaxLength(320)
                .HasColumnName("email");

            builder.Property(u => u.SenhaHash)
                .IsRequired()
                .HasMaxLength(500)
                .HasColumnName("senha_hash");

            builder.Property(u => u.CriadoEm)
                .IsRequired()
                .HasColumnName("criado_em");

            builder.HasIndex(u => u.Email)
                .IsUnique()
                .HasDatabaseName("ix_usuarios_email");
        }
    }

}
