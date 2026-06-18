using FluentValidation;

namespace Aplicacao.Registros.Commands.CreateRegistro
{
    public sealed class CreateRegistroCommandValidator : AbstractValidator<CreateRegistroCommand>
    {
        public CreateRegistroCommandValidator()
        {
            RuleFor(x => x.Empresa).NotEmpty().MaximumLength(200);
            RuleFor(x => x.Cnpj).NotEmpty().Length(14, 18);
            RuleFor(x => x.Local).MaximumLength(300);
            RuleFor(x => x.NomeFuncionario).NotEmpty().MaximumLength(200);
            RuleFor(x => x.DataPonto).NotEmpty();
            RuleFor(x => x.HorarioPonto).NotEmpty();
            RuleFor(x => x.ImagemStream).NotNull();
            RuleFor(x => x.ImagemNomeArquivo).NotEmpty();
            RuleFor(x => x.ImagemContentType)
                .NotEmpty()
                .Must(ct => ct.StartsWith("image/"))
                .WithMessage("O arquivo deve ser uma imagem.");
        }
    }

}
