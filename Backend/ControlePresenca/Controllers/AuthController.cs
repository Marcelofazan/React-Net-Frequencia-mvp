using Aplicacao.Auth.Commands.Login;
using Aplicacao.Auth.Commands.Register;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace ControlePresenca.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    public sealed class AuthController(IMediator mediator) : ControllerBase
    {
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterCommand command, CancellationToken ct)
        {
            var result = await mediator.Send(command, ct);
            return Ok(result);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginCommand command, CancellationToken ct)
        {
            var result = await mediator.Send(command, ct);
            return Ok(result);
        }
    }

}
