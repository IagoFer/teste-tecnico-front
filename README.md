# user-management-app

## Descrição do Projeto

Este é um aplicativo de gerenciamento de usuários desenvolvido usando Vue.js. O objetivo é fornecer uma interface para criar, visualizar e gerenciar usuários. O projeto é configurado para desenvolvimento local e produção, e inclui testes automatizados com Jest e Cypress.

## Clonando o Repositório

1. **Clonar o Repositório**
   - Abra o terminal e execute o comando para clonar o repositório:
     ```bash
     git clone https://github.com/IagoFer/teste-tecnico-front.git
     ```
   - Navegue até o diretório do projeto:
     ```bash
     cd user-management-app
     ```

## Configuração do Projeto

1. **Instalar as Dependências**
   - No diretório do projeto, execute o comando para instalar todas as dependências necessárias:
     ```bash
     npm install
     ```

2. **Compilar e Recarregar para Desenvolvimento**
   - Para iniciar o servidor de desenvolvimento e compilar o projeto, use o comando:
     ```bash
     npm run serve
     ```
   - Isso iniciará o aplicativo e você poderá acessá-lo no navegador em `http://localhost:8080` (ou em outra porta se especificado).

3. **Compilar e Minificar para Produção**
   - Quando estiver pronto para criar uma versão otimizada do projeto para produção, execute:
     ```bash
     npm run build
     ```
   - O resultado será um conjunto de arquivos otimizados na pasta `dist`. Esses arquivos estão prontos para serem enviados ao servidor de produção.

4. **Linter e Correção de Arquivos**
   - Para verificar e corrigir automaticamente problemas no código, execute:
     ```bash
     npm run lint
     ```

5. **Rodar Testes**
   - Para rodar testes unitários, use o comando:
     ```bash
     npx jest
     ```
   - Para rodar testes end-to-end com Cypress, use o comando:
     ```bash
     npx cypress run
     ```

6. **Personalizar a Configuração**
   - Se precisar personalizar a configuração do projeto, consulte a [Referência de Configuração do Vue CLI](https://cli.vuejs.org/config/).

## Desdobramentos e Decisões

Para começar o desenvolvimento do projeto, meu foco inicial foi construir a funcionalidade básica de autenticação, começando pelas páginas de login e registro (`Login.vue` e `Register.vue`). Estas páginas foram fundamentais para validar o fluxo de autenticação e garantir que os usuários possam se registrar e fazer login com sucesso.

### Decisões de Design

- **Páginas de Login e Registro**: Desenvolvi essas páginas primeiro para estabelecer uma base sólida para o gerenciamento de usuários. Isso permitiu a implementação de validações e interações com a API desde o início, assegurando que as funcionalidades essenciais estivessem operacionais.

- **Estrutura do Projeto**: Organizei o projeto em componentes Vue.js modulares para promover a reutilização e a manutenção do código. Componentes como `CreateUserForm.vue` e `UserList.vue` são responsáveis por funcionalidades específicas, enquanto o Vuex gerencia o estado da aplicação, lidando com autenticação e dados dos usuários.

- **Testes**: Para garantir a qualidade e a estabilidade do código, incluí testes automatizados com Jest para testes unitários e Cypress para testes end-to-end. Os testes são essenciais para validar a funcionalidade de componentes e fluxos de usuário, e para garantir que o aplicativo se comporte conforme esperado.

- **Dependências e Ferramentas**: Jest foi escolhido para testes unitários pela sua integração eficiente com o Vue, enquanto Cypress foi utilizado para testes end-to-end por sua robustez e capacidade de simular interações complexas com o usuário.

### Configuração e Deploy

- **Configuração Local**: Para configurar o projeto localmente, instale as dependências com `npm install`, inicie o servidor de desenvolvimento com `npm run serve`, e utilize `npm run build` para criar uma versão otimizada para produção.

- **Deploy**: O projeto foi implantado na Heroku, e o link para acessar a aplicação em produção é [https://teste-tecnico-front-54b07d87dc85.herokuapp.com/](https://teste-tecnico-front-54b07d87dc85.herokuapp.com/).

## Contato

Para dúvidas ou problemas, entre em contato com [Iago Fernandes Bastos](mailto:iagofernandesbastos@gmail.com).
