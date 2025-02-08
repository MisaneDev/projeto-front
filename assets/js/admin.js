document.addEventListener('DOMContentLoaded', () => {
    const formCadastro = document.getElementById('formCadastro');
    const listaUsuarios = document.getElementById('listaUsuarios');
    const limparBtn = document.getElementById('limpar');
    const excluirTodosBtn = document.getElementById('excluir-todos');
    const pesquisaInput = document.getElementById('pesquisa');
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');

    // Função para carregar os usuários do Local Storage
    function carregarUsuarios() {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        listaUsuarios.innerHTML = '';
        usuarios.forEach((usuario, index) => {
            const li = document.createElement('li');
            li.innerHTML = `${usuario.nome} - ${usuario.email} - ${usuario.data}`;
            const excluirBtn = document.createElement('button');
            excluirBtn.textContent = 'Excluir';
            excluirBtn.onclick = () => excluirUsuario(index);  // Excluir usa o índice original
            li.appendChild(excluirBtn);
            listaUsuarios.appendChild(li);
        });
    }

    // Função para adicionar usuário no Local Storage
    function adicionarUsuario(event) {
        event.preventDefault();

        const nome = nomeInput.value;
        const email = emailInput.value;
        const data = new Date().toLocaleString();
        
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios.push({ nome, email, data });
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        
        nomeInput.value = '';
        emailInput.value = '';
        
        carregarUsuarios();
    }

    // Função para excluir usuário do Local Storage
    function excluirUsuario(index) {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios.splice(index, 1); // Remove o usuário pelo índice
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        carregarUsuarios();
    }

    // Função para excluir todos os usuários
    function excluirTodosUsuarios() {
        localStorage.removeItem('usuarios');
        carregarUsuarios();
    }

    // Função para limpar os campos do formulário
    function limparCampos() {
        nomeInput.value = '';
        emailInput.value = '';
    }

    // Função para pesquisar na lista de usuários
    function pesquisarUsuarios() {
        const termo = pesquisaInput.value.trim().toLowerCase(); // Remover espaços antes e depois
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        
        // Filtrar usuários com base no termo de pesquisa
        const filtrados = usuarios.filter(usuario => 
            usuario.nome.toLowerCase().includes(termo) || usuario.email.toLowerCase().includes(termo)
        );
        
        // Exibir apenas os usuários filtrados
        listaUsuarios.innerHTML = '';
        filtrados.forEach((usuario, index) => {
            const li = document.createElement('li');
            li.innerHTML = `${usuario.nome} - ${usuario.email} - ${usuario.data}`;
            const excluirBtn = document.createElement('button');
            excluirBtn.textContent = 'Excluir';
            excluirBtn.onclick = () => excluirUsuario(index);  // A exclusão usa o índice filtrado
            li.appendChild(excluirBtn);
            listaUsuarios.appendChild(li);
        });
    }

    // Event listeners
    formCadastro.addEventListener('submit', adicionarUsuario);
    limparBtn.addEventListener('click', limparCampos);
    excluirTodosBtn.addEventListener('click', excluirTodosUsuarios);
    pesquisaInput.addEventListener('input', pesquisarUsuarios); // Realiza a pesquisa quando digita

    // Carregar usuários ao iniciar a página
    carregarUsuarios();
});
