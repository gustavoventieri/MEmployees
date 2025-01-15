# **MEmployees - Frontend**  

O frontend do **MEmployees** é a interface que permite a interação com o sistema de gerenciamento de funcionários, oferecendo uma experiência de usuário fluida e moderna. Utilizando **React**, **Material-UI**, e outras tecnologias avançadas, o sistema oferece uma dashboard elegante para monitoramento e gerenciamento de dados essenciais.

---

## **📌 Funcionalidades do Projeto**

💡 **Interface de Usuário**
- Dashboard com informações dinâmicas e visualmente atraentes.
- Exibição de gráficos interativos com **Recharts**.
- Formulários de entrada e edição de dados dos funcionários.

🔐 **Segurança**
- Armazenamento seguro de dados utilizando **CryptoJS**.
- Autenticação via **JWT**, com suporte a tokens de acesso.

📊 **Visualizações**
- **Gráficos** interativos para exibição de dados de funcionários.
- **Mascaras de entrada** para facilitar a inserção de dados (ex: CPF, CNPJ).
  
📈 **Validação e Fluxo de Dados**
- Validação de dados com **Yup** para garantir que as informações sejam precisas e válidas.

---

## **📂 Estrutura do Projeto**

- **/src**: Contém o código-fonte do frontend.
- **/components**: Componentes reutilizáveis para a interface do usuário.
- **/services**: Funções de interação com a API do backend.
- **/pages**: Páginas principais da aplicação.
- **/hooks**: Hooks personalizados para controle de estado e lógica de aplicação.

---

## **🚀 Guia de Configuração**

### **Passo 1: Pré-requisitos**
- **Node.js** instalado.  
- Gerenciador de pacotes **yarn** (recomendado).  

### **Passo 2: Instalação do Projeto**

1. Clone o repositório do frontend:
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

4. Inicie o servidor de desenvolvimento:
   ```bash
   yarn start
   ```

O frontend estará disponível em `http://localhost:3000`.

---

## **🔧 Tecnologias Principais**

### **🖥️ Linguagens e Frameworks**
- **React**: Biblioteca JavaScript para construção de interfaces de usuário interativas.
- **TypeScript**: Superset de JavaScript que adiciona tipagem estática, tornando o código mais robusto.
- **Material-UI**: Biblioteca de componentes React para construir interfaces de usuário modernas e responsivas.

### **📦 Dependências**
- **axios**: Biblioteca para realizar requisições HTTP, interagindo com a API do backend.
- **react-router-dom**: Roteamento para navegação entre as páginas do aplicativo.
- **react-input-mask**: Máscaras de entrada para facilitar o preenchimento de formulários (ex: CPF, CNPJ).
- **recharts**: Biblioteca para criar gráficos interativos baseados em dados dinâmicos.
- **yup**: Biblioteca para validação de dados dos formulários, garantindo que as entradas sejam válidas.

### **🔒 Segurança**
- **jwt-decode**: Biblioteca para decodificar e verificar o conteúdo de tokens JWT no frontend.
- **crypto-js**: Biblioteca para criptografar dados no lado do cliente, garantindo a segurança.

### **🧪 Testes**
- **@testing-library/react**: Utilizada para testar os componentes React.
- **Jest**: Framework de testes para garantir que os componentes e funcionalidades funcionem corretamente.
  
---

## **🎯 Funcionalidades Adicionais**
- **ThemeProvider** com suporte a modo claro/escuro utilizando **Material-UI**.
- **Input Masks** com a biblioteca **imaskjs** para facilitar a inserção de dados específicos.
- **React Router** para controle de navegação entre as páginas da aplicação.
  
---

## **💡 Melhorias Futuras**
- Integração de novos tipos de gráficos e relatórios avançados.
- Melhorias na performance e otimização de renderização de componentes.
- Adição de novos recursos de personalização do usuário.

---

## **📦 Scripts do Projeto**

- **Iniciar o servidor de desenvolvimento**:  
  ```bash
  yarn start
  ```

- **Criar o build de produção**:  
  ```bash
  yarn build
  ```

- **Executar os testes**:  
  ```bash
  yarn test
  ```

---

## **Licença**

Este projeto está licenciado sob a **MIT License** - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## **Contato**
- **Autor**: [Seu Nome](https://www.linkedin.com/in/seu-perfil)
- **Repositório**: [GitHub - MEMployees Frontend](https://github.com/SEU_USUARIO/memployees-frontend)

---

> **MEmployees ** é uma interface de usuário moderna e fácil de usar, projetada para se integrar perfeitamente ao sistema de gerenciamento de funcionários desenvolvido no backend. Ele foi criado para garantir uma experiência visual agradável e interativa ao usuário final.

---
