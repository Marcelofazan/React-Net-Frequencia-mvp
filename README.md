## 🌐 React-Api10-EF-Jwt-Supabase-mvp
Aplicativode controle de presença em React e C# ASP.NET 10 com banco de dados Supabase.

📋 O que voçê vai ver nesse Projeto


#### 📁 Requisitos do Projeto

## Supabase — configuração inicial

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
    "Url": "https://eabwsveuwxffvsawdotu.supabase.co",
    "ServiceKey": "COLE_AQUI_A_SUA_CHAVE_SERVICE_ROLE_SECRET",
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

#### 🔄 Executar a aplicação

```bash
cd backend
dotnet ef migrations add BancoInicial --project src/PointO.Infrastructure --startup-project src/PointO.API
dotnet ef database update --project src/PointO.Infrastructure --startup-project src/PointO.API
dotnet run --project src/PointO.API/PointO.API.csproj
```

http://localhost:5017/swagger/index.html


## 📁 Frontend 

🔄 Executar a aplicação

cd frontend

```bash
npm install
```

```bash
npm run dev
```

O app estará disponível em `http://localhost:5173`.


{
  "email": "mmgustavo33@gmail.com",
  "senha": "D2f1a2r3"
}
