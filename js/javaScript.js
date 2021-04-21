let btn = window.document.querySelector('svg')
let verSenha = window.document.querySelector('#verSenha')
let cadastrar = window.document.querySelector('#cadastrar')

let nome = window.document.querySelector('#nome')
let labelNome = window.document.querySelector('#labelNome')
let usuario = window.document.querySelector('#usuario')
let labelUsuario = window.document.querySelector('#labelUsuario')
let senha = window.document.querySelector('#senha')
let labelSenha = window.document.querySelector('#labelSenha')
let confirmasenha = window.document.querySelector('#confirmasenha')
let labelConfirmeSenha = window.document.querySelector('#labelConfirmeSenha')

let valideNome
let valideUsuario
let valideSenha
let valideConfirmeSenha

let msgErro = window.document.querySelector('#msgErro')
let msgSucesso = window.document.querySelector('#msgSucesso')

btn.addEventListener('click', () => {
    let inputSenha = window.document.querySelector('#senha')

    if(inputSenha.getAttribute('type') == 'password') {
        inputSenha.setAttribute('type', 'text')
    
    }else {
        inputSenha.setAttribute('type', 'password')

    }

})

verSenha.addEventListener('click', () => {
    let inputSenha = window.document.querySelector('#confirmasenha')

    if(inputSenha.getAttribute('type') == 'password') {
        inputSenha.setAttribute('type', 'text')
    
    }else {
        inputSenha.setAttribute('type', 'password')

    }

})

/* BOTAO CADASTRAR USUARIO */
cadastrar.addEventListener('click', () => {
    if(valideNome && valideUsuario && valideSenha && valideConfirmeSenha) {
        
        /* ADICIONA O DADOS A UM USUARIO JA EXISTENTE OU CASO O USUARIO NAO EXISTA CRIE UM NOVO */
        let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]')
        
        if(localStorage.getItem('listaUser')) {
            alert('O dado ja existe na base de dados')

            window.location.href = '../index.html'

        }else {
            /* INSERE/'PUSH' ou 'PUT' DADOS DENTRO DE UMA TABELA/OBJETO -> listaUser */
            listaUser.push(
                {
                    nomeBody: nome.value,
                    usuarioBody: usuario.value,
                    senhaBody: senha.value
                }
            )

            /* CRIA OU ATUALIZA UM REGISTRO DENTRO DO HISTORAGE / BASE DE DADOS DO NAVEGADOR */
            localStorage.setItem('listaUser', JSON.stringify(listaUser))

            msgSucesso.setAttribute('style', 'display: block')
            msgSucesso.innerHTML = '<strong>Cadastro realizado com sucesso.</strong>'
            
            msgErro.setAttribute('style', 'display: none')

        }
        
        /* COLOCA UM TEMPO PARA REDIRECIONAR A PAGINA PARA O LOGIN */
        setTimeout(() => {
            window.location.href = '../index.html'
        }, 3000)
    
    } else {
        msgErro.setAttribute('style', 'display: block')
        msgErro.innerHTML = '<strong>Preencha os campos corretamente</strong>'
        
        msgSucesso.setAttribute('style', 'display: none')

    }  

})

/* LOGA O USUARIO NA SESSAO */
function logar() {
    let usuario = window.document.querySelector('#usuario')
    let labelUsuario = window.document.querySelector('#labelUsuario')
    let senha = window.document.querySelector('#senha')
    let labelSenha = window.document.querySelector('#labelSenha')

    let listaUser = []

    let userValide = {
        nome: '',
        usuario: '',
        senha: ''
    }

    listaUser = JSON.parse(localStorage.getItem('listaUser'))
    
    listaUser.forEach((item) => {
        if(usuario.value == item.usuarioBody && senha.value == item.senhaBody) {
            userValide = {
                nome: item.nomeBody,
                usuario: item.usuarioBody,
                senha: item.senhaBody
            }

        }

    })

    if(usuario.value == userValide.usuario && senha.value == userValide.senha) {
        /* REDIRECIONA O USUARIO PARA UM PAGINA ESPECIFICA */
        window.location.href = '../home.html'

        /* GERA UM TOKEN PARA ACESSO DE USUARIO POR MEIO DO METODO RANDOM E TO STRING, O substr() E PARA EXCLUIR AS DUAS PRIMEIRAS POSICOES */
        let token = Math.random().toString(16).substr(2) + Math.random().toString(16).substr(2)
        localStorage.setItem('token', token)
        
    }else {
        usuario.setAttribute('style', 'border-color: red')
        labelUsuario.setAttribute('style', 'color: red')
        senha.setAttribute('style', 'border-color: red')
        labelSenha.setAttribute('style', 'color: red')

        msgErro.setAttribute('style', 'display: block')
        msgErro.innerHTML = 'Usuario ou senha invalidos'

        msgSucesso.setAttribute('style', 'display: none')

        /* RETORNA O MOUSE PARA O INPUT PARA INSERIR OS DADOS NOVAMENTE */
        usuario.focus()

    }

}

/* LIMPA O TOKEN DO USUARIO */
function sair() {
    localStorage.removeItem('token')

    window.location.href = '../index.html'

}

/* VALIDANDO DADOS */
nome.addEventListener('keyup', () => {
    if(nome.value.length <= 2) {
        labelNome.setAttribute('style', 'color: red')
        labelNome.innerHTML = 'Nome *Insira no minimo 3 caracteres'
        nome.setAttribute('style', 'border-color: red')

        valideNome = false;

    }else {
        labelNome.setAttribute('style', 'color: green')
        labelNome.innerHTML = 'Nome'
        nome.setAttribute('style', 'border-color: green')

        valideNome = true;

    }

});

usuario.addEventListener('keyup', () => {
    if(usuario.value.length <= 4) {
        labelUsuario.setAttribute('style', 'color: red')
        labelUsuario.innerHTML = 'Usuario *Insira no minimo 5 caracteres'
        usuario.setAttribute('style', 'border-color: red')

        valideUsuario = false;

    }else {
        labelUsuario.setAttribute('style', 'color: green')
        labelUsuario.innerHTML = 'Usuario'
        usuario.setAttribute('style', 'border-color: green')

        valideUsuario = true;

    }

});

senha.addEventListener('keyup', () => {
    if(senha.value.length <= 5) {
        labelSenha.setAttribute('style', 'color: red')
        labelSenha.innerHTML = 'Senha *Insira no minimo 5 caracteres'
        senha.setAttribute('style', 'border-color: red')

        valideSenha = false;

    }else {
        labelSenha.setAttribute('style', 'color: green')
        labelSenha.innerHTML = 'Senha'
        senha.setAttribute('style', 'border-color: green')

        valideSenha = true;

    }

});

confirmasenha.addEventListener('keyup', () => {
    if(confirmasenha.value != confirmasenha.value) {
        labelConfirmeSenha.setAttribute('style', 'color: red')
        labelConfirmeSenha.innerHTML = 'Confirmar Senha *As senha nao conferem'
        confirmasenha.setAttribute('style', 'border-color: red')

        valideConfirmeSenha = false;

    }else {
        labelConfirmeSenha.setAttribute('style', 'color: green')
        labelConfirmeSenha.innerHTML = 'Confirmar Senha'
        confirmasenha.setAttribute('style', 'border-color: green')

        valideConfirmeSenha = true;

    }

});