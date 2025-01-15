# **MEmployees**  

Uma API REST moderna que explora conceitos essenciais do backend, com foco em boas práticas, segurança e organização de código. Em breve, será complementada por um front-end integrado para oferecer uma experiência completa ao usuário.  

> **Status do Projeto:** Em Desenvolvimento  

---

## **📌 Funcionalidades do Projeto**  

💡 **Gerenciamento de Dados**  
- Controle de usuários com email e senha.  
- Criptografia de senhas utilizando **bcryptjs**.  
- Paginação e filtros para consultas otimizadas.  

🔒 **Segurança e Autenticação**  
- Geração e validação de tokens JWT.  
- Validação detalhada de dados recebidos nos endpoints.  

⚙️ **Banco de Dados**  
- Migrations para controle de versões do banco.  
- Seeds para inicialização de dados.  
- Query builder com **Knex** para consultas dinâmicas e flexíveis.  

🧪 **Qualidade de Código**  
- Testes automatizados com **Jest** e **Supertest**.  
- Adoção de boas práticas de **Clean Code** e organização modular.  

🎨 **Futuro Front-End**  
- Planejamento de um front-end robusto para consumir a API, proporcionando uma interface amigável e intuitiva para os usuários.  
- O front-end será desenvolvido com tecnologias modernas como **React.js** e **TypeScript**.  

---

## **📂 Estrutura do Projeto**  

- **Endpoints e Controllers**: Organização modular para facilitar manutenção e escalabilidade.  
- **Banco de Dados SQL**: Suporte para múltiplos bancos de dados durante o desenvolvimento e produção.  
- **Middleware**: Centralização de validações, autenticação e outras regras de negócio.  

---

## **🚀 Guia de Configuração**  

### **Passo 1: Pré-requisitos**  
- **Node.js** instalado.  
- Gerenciador de pacotes **Yarn** (recomendado).  

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
   Crie um arquivo `.env` com o seguinte conteúdo:  
   ```env
   PORT=3333
   NODE_ENV=dev
   IS_LOCALHOST=true
   ENABLED_CORS=[Lista de endereços separados por ";"]
   JWT_SECRET=[Uma string segura]
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
- **SQLite**: Banco de dados leve e eficiente, ideal para desenvolvimento local.  
- **Knex**: Query Builder para facilitar a interação com bancos de dados SQL.  

### **🔒 Autenticação e Segurança**  
- **JWT (JsonWebToken)**: Geração e validação de tokens para autenticação segura.  
- **Bcryptjs**: Biblioteca para hash e verificação de senhas, garantindo segurança.  

### **✅ Validação e Testes**  
- **Yup**: Validação de esquemas para garantir a integridade dos dados recebidos.  
- **Jest**: Framework de testes poderoso e fácil de usar.  
- **Supertest**: Ferramenta para testar endpoints de APIs, garantindo confiabilidade.  

---

## **🌟 Próximos Passos**  

- Desenvolvimento de um **front-end moderno** com **React.js** e **TypeScript** para consumir a API e oferecer uma interface completa.  
- Integração de novas funcionalidades, como gestão avançada de permissões e relatórios detalhados.  

