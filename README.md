
# MEmployees - Management Employees

> Em Desenvolvimento

**MEmployees** é uma solução robusta e inovadora destinada a facilitar a gestão de recursos humanos em empresas de diferentes portes e setores. O sistema oferece funcionalidades poderosas para controlar informações vitais dos funcionários, incluindo cargos, horários de trabalho, escalas e alocação de setores. Além disso, a plataforma possui uma dashboard moderna e intuitiva, projetada para fornecer uma visão clara e precisa dos dados dos colaboradores em tempo real.

Com **MEmployees**, é possível otimizar o gerenciamento de equipes, monitorando a produtividade, o número de funcionários em cada cargo e garantindo que os horários de trabalho sejam respeitados. A plataforma permite uma gestão eficiente das informações, promovendo transparência e organização dentro da empresa. Tudo isso, aliado a um design limpo e elegante, proporciona uma experiência de usuário excepcional.

Este projeto foi desenvolvido utilizando tecnologias de ponta, como Node.js, React, TypeScript e PostgreSQL, garantindo não apenas a escalabilidade do sistema, mas também um desempenho elevado para atender empresas de diversos tamanhos. Com uma estrutura flexível e moderna, **MEmployees** é a solução ideal para quem busca otimizar e profissionalizar a administração de recursos humanos.





## Tecnologias Usadas

- **Backend**: Node.js com TypeScript
- **Frontend**: React com TypeScript
- **Banco de Dados**:
  - **Produção**: PostgreSQL
  - **Desenvolvimento/Teste**: SQLite
- **Testes**: Jest (para testes unitários)
- **Estilo**: Material-UI para uma interface limpa e moderna



## Funcionalidades

### 📊 Dashboard
- Visão geral dos dados dos funcionários.
- **Total de Funcionários** na empresa.
- **Total de Cargos** e setores.
- **Grafico com Todas as Informações** 


  
### 👩‍💻 Gestão de Funcionários
- **Cadastro e Edição** de funcionários.
- **Atribuição de Cargos** e **setores**.
- **Controle de Horários** e escalas de trabalho.
  
### ⚙️ Gestão de Cargos
- Adicionar, editar e excluir **cargos**.
- **Atribuição** de funcionários aos cargos corretos.

### 🧪 Testes
- Testes unitários para garantir a estabilidade e a confiabilidade do sistema com o **Jest**.



## Como Rodar o Projeto

### 🛠️ Pré-requisitos
- [Node.js](https://nodejs.org/en/) - Versão recomendada: v14.x.x ou superior.
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/) - Para gerenciar dependências.
- [PostgreSQL](https://www.postgresql.org/) para ambiente de produção.
- [SQLite](https://www.sqlite.org/) para ambiente de desenvolvimento e testes.

### ⚡ Estrutura do Projeto

A estrutura do projeto é dividida em **frontend** e **backend**:

- **Frontend**: Localizado na raiz do projeto (pasta raiz).
- **Backend**: Localizado dentro da pasta `./api/`.



### ⚡ Inicialização do Projeto

### 1. **Clone este repositório**:
   ```bash
   git clone https://github.com/gustavoventieri/MEmployees.git
   cd MEmployees
```
#### 2. **Rodando o Frontend (na raiz do projeto)**

O frontend foi desenvolvido utilizando React e TypeScript, e fica localizado na pasta raiz do projeto.

- **Instale as dependências do frontend**:
   ```bash
   npm install
   # ou
   yarn install
   ```

- **Inicie o frontend**:
   ```bash
   npm run start
   # ou
   yarn start
   ```

O frontend estará acessível em `http://localhost:3000`.

#### 3. **Rodando o Backend (dentro de ./api/)**

O backend foi desenvolvido com Node.js e fica localizado na pasta `./api/`.

- **Instale as dependências do backend**:
   ```bash
   cd api
   npm install
   # ou
   yarn install
   ```

- **Inicie o backend**:
   ```bash
   npm run start
   # ou
   yarn start
   ```

O backend estará acessível em `http://localhost:8080` (ou outro endpoint configurado no seu `server.ts`).

#### 4. **Rodando os Testes**

- **Para rodar os testes do backend**:
   ```bash
   cd api
   npm run test
   # ou
   yarn test
   ```





## Estrutura do Projeto

- **/MEmployees**: Contém o código-fonte do frontend (React + TypeScript).
  - **/src**: Contém a lógica da interface de usuário e integração com a API.
  
- **/api**: Contém o código-fonte do backend (Node.js).
  - **/controllers**: Lógica de controle da API.
  - **/models**: Definições de modelos de dados (com PostgreSQL).
  - **/routes**: Definições das rotas da API.
  




## Contato

- **Autor**: [Gustavo Ventieri](https://www.linkedin.com/in/gustavo-ventieri/)
- **Repositório**: [GitHub - MEMployees](https://github.com/gustavoventieri/MEmployees)



### 🎉 Agradecimentos
Agradecemos pelo interesse no **MEMployees**! Este projeto é uma forma de tornar a gestão de funcionários mais eficiente e com a tecnologia de hoje.


