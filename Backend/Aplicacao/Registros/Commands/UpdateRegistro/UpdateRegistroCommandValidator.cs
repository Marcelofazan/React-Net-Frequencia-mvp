using FluentValidation;

namespace Aplicacao.Registros.Commands.UpdateRegistro
{
    public sealed class UpdateRegistroCommandValidator : AbstractValidator<UpdateRegistroCommand>
    {
        public UpdateRegistroCommandValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
            RuleFor(x => x.Empresa).NotEmpty().MaximumLength(200);
            RuleFor(x => x.Cnpj).NotEmpty().Length(14, 18);
            RuleFor(x => x.Local).MaximumLength(300);
            RuleFor(x => x.NomeFuncionario).NotEmpty().MaximumLength(200);
            RuleFor(x => x.DataPonto).NotEmpty();
            RuleFor(x => x.HorarioPonto).NotEmpty();
        }
    }

}
