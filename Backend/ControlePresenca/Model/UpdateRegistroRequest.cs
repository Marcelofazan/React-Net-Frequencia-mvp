namespace ControlePresenca.Model;

public record UpdateRegistroRequest(
    string Empresa,
    string Cnpj,
    string Local,
    string NomeFuncionario,
    DateOnly DataPonto,
    TimeOnly HorarioPonto
);
