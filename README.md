# user-management-app

## Configuração do Projeto

1. **Instalar as Dependências**
   - Abra o terminal e navegue até o diretório do projeto.
   - Execute o comando para instalar todas as dependências necessárias:
     ```bash
     npm install
     ```

2. **Compilar e Recarregar para Desenvolvimento**
   - Para iniciar o servidor de desenvolvimento e compilar o projeto, use o comando:
     ```bash
     npm run serve
     ```
   - Isso iniciará o aplicativo e você poderá acessá-lo no navegador normalmente em `http://localhost:8080` (ou em outra porta se especificado).

3. **Compilar e Minificar para Produção**
   - Quando você estiver pronto para criar uma versão otimizada do projeto para produção, execute:
     ```bash
     npm run build
     ```
   - O resultado será um conjunto de arquivos otimizados para serem enviados ao servidor de produção. Esses arquivos estarão na pasta `dist`.

4. **Linter e Correção de Arquivos**
   - Para verificar e corrigir automaticamente problemas no código, execute:
     ```bash
     npm run lint
     ```

5. **Rodar Testes**
   - Para rodar testes unitários, use o comando:
     ```bash
     npx jest tests/unit/Navbar.spec.js
     ```
   - Para rodar testes end-to-end com Cypress, use o comando:
     ```bash
     npx cypress run
     ```

6. **Personalizar a Configuração**
   - Se precisar personalizar a configuração do projeto, consulte a [Referência de Configuração](https://cli.vuejs.org/config/).
