const form = document.querySelector("#form");
const antigasenha = document.querySelector("#Box1");
const novasenha = document.querySelector("#Box2");
const confsenha = document.querySelector("#Box3");
const confirmarBtn = document.querySelector("#confirmar");
const olhoSenhaAtual = document.querySelector("#senhaAtual");
const olhoSenhaNova = document.querySelector("#senhaNova");
const olhoConfirmarNova = document.querySelector("#confirmarNova")
const fecharModalBotao = document.querySelector("#fechar-modal")
const modal = document.querySelector("#modal")
const fundoComOpacidade = document.querySelector("#fundo-com-opacidade")
const campoTextoErro = document.querySelector("#campo-texto-erro")
const usuario = JSON.parse(localStorage.usuariosessao);
console.log(usuario)

const toggleModal = () => {
    modal.classList.toggle("esconder")
    fundoComOpacidade.classList.toggle("esconder")
}

fundoComOpacidade.addEventListener("click", (event) => {
    toggleModal()
})

fecharModalBotao.addEventListener("click", (event) => {
    toggleModal()
})

const senhaRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#¨])[A-Za-z\d@$!%*?&#¨]{8,}$/;

olhoSenhaAtual.addEventListener("click",(e)=>{
    if (antigasenha.type === "password") {
        antigasenha.type = "text"
        olhoSenhaAtual.src = '../imagens/Olho aberto.png'
    }else{
        antigasenha.type = "password"
        olhoSenhaAtual.src = '../imagens/Olho fechado.png'
    }
})

olhoSenhaNova.addEventListener("click",(e)=>{
    if (novasenha.type === "password") {
        novasenha.type = "text"
        olhoSenhaNova.src = '../imagens/Olho aberto.png'
    }else{
        novasenha.type = "password"
        olhoSenhaNova.src = '../imagens/Olho fechado.png'
    }
})

olhoConfirmarNova.addEventListener("click",(e)=>{
    if (confsenha.type === "password") {
        confsenha.type = "text"
        olhoConfirmarNova.src = '../imagens/Olho aberto.png'
    }else{
        confsenha.type = "password"
        olhoConfirmarNova.src = '../imagens/Olho fechado.png'
    }
})



confirmarBtn.addEventListener("click", (event) =>{
    event.preventDefault();

    if(antigasenha.value === ""){
        antigasenha.style.border = "2px solid red"
        antigasenha.placeholder = "Preencha sua senha"
        toggleModal()
        campoTextoErro.innerHTML = "Campo senha atual vázio"
        return;
    }else if (antigasenha.value !== usuario.senha) {
        antigasenha.style.border = "2px solid red"
        antigasenha.placeholder = "Preencha sua senha"
        toggleModal()
        campoTextoErro.innerHTML = "Senha atual inválida"
        return;
    }else{
         antigasenha.style.border = "2px solid #D9D9D9"
    }
    
    if (novasenha.value === ""){
        novasenha.style.border = "2px solid red"
        novasenha.placeholder = "Preencha sua senha"
        toggleModal()
        campoTextoErro.innerHTML = "Campo nova senha vázio"
        return;
    }else if(!senhaRegex.test(novasenha.value)) {
        novasenha.style.border = "2px solid red"
        novasenha.placeholder = "Preencha sua senha"
        toggleModal()
        campoTextoErro.innerHTML = "Nova senha não atende aos requisitos"
        return;
    }else{
        novasenha.style.border = "2px solid #D9D9D9"
    }
    
    if (confsenha.value === ""){
        confsenha.style.border = "2px solid red"
        confsenha.placeholder = "Preencha sua senha"
        toggleModal()
        campoTextoErro.innerHTML = "Campo confirmar senha vázio"
        return;
    }else if (confsenha.value !== novasenha.value ) {
        confsenha.style.border = "2px solid red"
        confsenha.placeholder = "Preencha sua senha"
        toggleModal()
        campoTextoErro.innerHTML = "Senhas não correspomdem"
        return;
    }else{
        confsenha.style.border = "2px solid #D9D9D9"
    }
    toggleModal()
    campoTextoErro.innerHTML = "Você alterou sua senha"


    fetch('http://localhost:3000/api/usuario/alterarSenha', {
        method: 'PATCH',
        headers:{
            'accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            id: usuario.id,
            senhaAtual: antigasenha.value,
            novaSenha: novasenha.value
    })
    }).then(
    response => response.json()
    ).then(
        html =>{
            usuario.senha = JSON.stringify(html.result)
            localStorage.usuariosessao = JSON.stringify(usuario)
            setTimeout(() => {
                window.location.href = "../html/autenticacao.html"
            }, 4000);
            
        } 
    );
});