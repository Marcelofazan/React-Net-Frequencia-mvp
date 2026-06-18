## 🌐 React-Api10-EF-Jwt-Supabase-mvp
Aplicativo de controle de presença em React e C# ASP.NET 10 com banco de dados Supabase.

#### 🎨 Aqui está uma demonstração do projeto
<img width="800" height="350" alt="Controle_Presenca" src="https://github.com/user-attachments/assets/13a7a3db-e3dc-412f-bb52-01bc602aaa70" />

#### 📁 Requisitos do Projeto

- Supabase — configuração inicial

1- Get connected -> Escolha Direct Connection String -> Selecione Type e Copie a conexão .NET.

2- Chave Secreta Supabase 
- Abra o painel do seu Supabase.
- Vá em Project Settings (Configurações do Projeto) ⚙️ no menu lateral.
- Clique em API.
- Procure por service_role secret (esta é a chave mestre). 
- Copie o código dela.
- Abra o seu arquivo **appsettings.json** no C# e cole esse código no lugar do texto longo atual.

Modifique o arquivo **appsettings.Development.json**:

```bash
"Supabase": {
    "Url": "https://[SEU_HOST].supabase.co",
    "ServiceKey": "[SUA_CHAVE_SECRETA]",
    "Bucket": "comprovantes"
}
```

3- Em **Storage**, crie um Bucket chamado 'comprovantes' e marque como **Public**

- Va até o editor SQL do Supabase e executar o comando de Política de privacidade Supabase do **Storage**.
```bash
CREATE POLICY "Liberar upload de comprovantes" 
ON storage.objects 
FOR INSERT 
TO anon
WITH CHECK (bucket_id = 'comprovantes');
```

## 📁 Backend 

#### 📋 O que voçê vai ver nesse Projeto

| Tecnologia | Descrição |
|-----------|------------|
| **CQRS** | É um padrão arquitetural que separa as operações de escrita (comandos) das operações de leitura (consultas) |
| **CORS** | Mecanismo de segurança implementado no navegador e não uma responsabilidade do frontend ou backend |
| **Fluent Validation** | Biblioteca para regras de validação de forma simples, legível e desacoplada|
| **JWT** | É um crachá digital usado para identificar usuários e trocar informações de forma segura entre computadores |
| **Mediatr** | Desacoplar classes, permitindo que diferentes componentes de um sistema se comuniquem através de um ponto central (o mediador)|
| **Supabase** | Wrapper (capa facilitadora) para simplificar o desenvolvimento com o banco de dados PostgreSQL  |
| **Storage Supabase** | Gerenciamento e armazenamento de arquivos de qualquer tipo como imagens, vídeos, PDFs e documentos. |

#### 🔄 Executar a aplicação

```bash
cd backend
dotnet ef migrations add BancoInicial --project InfraEstrutura --startup-project ControlePresenca
dotnet ef database update --project InfraEstrutura --startup-project ControlePresenca
dotnet run --project ControlePresenca/ControlePresenca.csproj
```
- Link Swagger  **http://localhost:5283/swagger/index.html**

### Fluxo de uma requisição

```
HTTP Request
  └─► RegistrosController          (API)
        └─► MediatR.Send(Command)
              └─► ValidationBehavior (FluentValidation)
                    └─► CommandHandler             (Applicacao)
                          ├─► IStorageService       → Supabase Storage
                          └─► IRegistroRepository   → PostgreSQL
                                └─► AppDbContext    (Infrastructure/EF Core)
```
## 📁 Frontend 

#### 📋 O que voçê vai ver nesse Projeto

| Tecnologia | Descrição |
|-----------|------------|
| **Tailwind CSS** | Framework CSS focado em utilitários para estilizar os elementos. |
| **TanStack** | Biblioteca de gerenciamento de estado de servidor para aplicações web. |
| **Zod** | Biblioteca popular de validação e declaração de esquemas (schema) que executa regras exatas para o formato dos dados e os valide em tempo de execução |

 Fluxo de dados
 
```
App.tsx
  ├─ useRegistros() → TanStack Query → axios → /api/v1/registros
  ├─ RegistrosFiltros.tsx  (estado local, callback para App)
  ├─ RegistrosTable.tsx
  │   ├─ TanStack Table (sort, render)
  │   ├─ useDeletarRegistro() → mutation
  │   └─ EditarRegistroDialog.tsx → useAtualizarRegistro()
  └─ UploadSheet.tsx
      └─ useCriarRegistro() → mutation (FormData multipart)
```

- Separação de responsabilidades.

| Tecnologia | Descrição |
|-----------|------------|
| **Components** | JSX puro, só renderiza |
| **Hooks** | toda a lógica (queries, mutations, estado) |
| **Services** | configuração do axios |
| **Types** | contratos TypeScript |


#### 🔄 Executar a aplicação

- Recuperar as dependencias do projeto node_modules .
```bash
npm install
```
- Executar o Build do Projeto
```bash
npm run dev
```

O app estará disponível em **http://localhost:5173**.
