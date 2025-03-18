
# Instruções para Execução no XAMPP

Este guia explica como configurar e executar o projeto no servidor local XAMPP.

## Requisitos

- XAMPP instalado (com Apache)
- Node.js e npm instalados

## Passos para Execução

### 1. Preparar o Projeto

1. Clone ou baixe o repositório do projeto
2. Abra o terminal na pasta do projeto
3. Instale as dependências:
   ```
   npm install
   ```
4. Compile o projeto para produção:
   ```
   npm run build
   ```
   Isso criará uma pasta `dist` com os arquivos JavaScript compilados.

### 2. Configurar no XAMPP

1. Inicie o XAMPP Control Panel e ative o serviço Apache
2. Copie todo o conteúdo da pasta `dist` para uma nova pasta dentro do diretório `htdocs` do XAMPP
   - Exemplo: `C:\xampp\htdocs\trackboard-connector` (Windows)
   - Exemplo: `/Applications/XAMPP/htdocs/trackboard-connector` (Mac)
   - Exemplo: `/opt/lampp/htdocs/trackboard-connector` (Linux)

### 3. Acessar o Projeto

1. Abra seu navegador
2. Acesse o endereço: `http://localhost/trackboard-connector`

## Processo de Compilação

Durante o processo de compilação (npm run build):

1. Os arquivos TypeScript (.ts/.tsx) são compilados para JavaScript
2. O código é otimizado e minificado
3. Os recursos são empacotados com caminhos relativos
4. Todos os arquivos são gerados na pasta `dist`

## Solução de Problemas

Se você encontrar uma página em branco:

1. Verifique se todos os arquivos foram copiados corretamente para a pasta do XAMPP
2. Abra o console do navegador (F12) para verificar erros
3. Certifique-se de que o Apache está rodando corretamente
4. Verifique se a URL está correta. O projeto usa HashRouter, então a URL base deve ser apenas `http://localhost/trackboard-connector` sem nenhuma barra adicional no final

## Nota Importante

Este projeto utiliza HashRouter para garantir compatibilidade com servidores Apache como o XAMPP. Isso significa que as URLs usarão o formato `#/` para navegação, por exemplo: `http://localhost/trackboard-connector/#/pagina`.
