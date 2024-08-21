const novaSenha = document.querySelector("#input-nova-senha");
const confirmarSenha = document.querySelector("#input-confirmar-senha");
const confirmarBotao = document.querySelector("#confirmar-botao");

confirmarBotao.addEventListener("click", (event) =>{

    event.preventDefault();

    const senhaRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#¨])[A-Za-z\d@$!%*?&#¨]{8,}$/;

    if (novaSenha.value === ""){ 
        novaSenha.style.border = " 3px solid red"
        novaSenha.placeholder = "Campo vázio"
        return;
    }else if(!senhaRegex.test(novaSenha)){
        novaSenha.style.border = " 3px solid red"
        novaSenha.placeholder = "Senha inválida"
        return;
    }
  
    if (confirmarSenha.value === ""){
        confirmarSenha.style.border = " 3px solid red"
        confirmarSenha.placeholder = "Campo vázio"
        return;
    }else if (confirmarSenha.value !== novaSenha.value) {
        confsenha.style.border = " 3px solid red"
        confsenha.placeholder = "Senhas não correspomdem"
        return;
    }

    window.location.href = "login.html";
});