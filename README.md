# **MEmployees - Backend**  

Uma API REST moderna que explora conceitos essenciais do backend, com foco em boas práticas e organização de código.  

---

## **📌 Funcionalidades do Projeto**  

💡 **Gerenciamento de Dados**  
- Controle de usuários com email e senha.  
- Criptografia de senhas utilizando **bcryptjs**.  
- Paginação e filtros de consultas otimizadas.  

🔒 **Segurança e Autenticação**  
- Geração e validação de tokens JWT.  
- Validação detalhada de dados que chegam aos endpoints.  

⚙️ **Banco de Dados**  
- Migrations para controle de versões do banco.  
- Seeds para inicialização de dados.  
- Query builder com **Knex** para consultas dinâmicas.  

🧪 **Qualidade de Código**  
- Testes automatizados com **Jest** e **Supertest**.  
- Uso de boas práticas de **Clean Code**.  

---

## **📂 Estrutura do Projeto**  

- **Endpoints e Controllers**: Organização modular para facilitar a manutenção.  
- **Banco de Dados SQL**: Configuração para suportar múltiplos bancos de dados.  
- **Middleware**: Validações e autenticação centralizadas.
  
---

## **🚀 Guia de Configuração**  

### **Passo 1: Pré-requisitos**  
- **Node.js** instalado.  
- Gerenciador de pacotes **yarn** (recomendado).  

### **Passo 2: Instalação do Projeto**  

1. Clone o repositório:  
   ```bash
   git clone https://github.com/gustavoventieri/MEmployees.git
   ```  

2. Acesse a pasta do projeto:  
   ```bash
   cd MEmployees
   ```  

3. Instale as dependências:  
   ```bash
   yarn install
   ```  

4. Configure o ambiente:  
   Crie um arquivo `.env` com o conteúdo:  
   ```env
   PORT=3333
   NODE_ENV=dev
   IS_LOCALHOST=true
   ENABLED_CORS=[Lista de endereços separados por ";"]
   JWT_SECRET=[Uma string qualquer]
   ```  

5. Inicie o servidor:  
   ```bash
   yarn start
   ```  

---

## **🔧 Tecnologias Principais**  

### **🖥️ Linguagens e Frameworks**  
- **Node.js**: Ambiente de execução para JavaScript no lado do servidor.  
- **Express**: Framework minimalista para criar aplicações web e APIs robustas.  

### **🗂️ Banco de Dados**  
- **SQLite**: Banco de dados leve e eficiente, ideal para desenvolvimento local e projetos menores.  
- **Knex**: Query Builder para facilitar a interação com bancos de dados SQL.  

### **🔒 Autenticação e Segurança**  
- **JWT (JsonWebToken)**: Geração e validação de tokens para autenticação segura.  
- **Bcryptjs**: Biblioteca para hash e verificação de senhas, garantindo segurança.  

### **✅ Validação e Testes**  
- **Yup**: Validação de esquemas para garantir a integridade dos dados recebidos.  
- **Jest**: Framework de testes poderoso e fácil de usar.  
- **Supertest**: Ferramenta para testar endpoints de APIs, garantindo confiabilidade.  

