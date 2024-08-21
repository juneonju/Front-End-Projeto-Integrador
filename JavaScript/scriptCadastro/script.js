const nomeCompleto = document.querySelector("#input-nome")
const cpf = document.querySelector("#input-cpf")
const dataNascimento = document.querySelector("#input-data-nascimento")
const email = document.querySelector("#input-email")
const telefone = document.querySelector("#input-telefone")
const senha = document.querySelector("#input-senha")
const confirmarSenha = document.querySelector("#input-confirmar-senha")
const botao = document.querySelector("#botao-enviar-informacoes")
const imgOlhoSenha = document.querySelector("#img-olho-senha")
const imgOlhoConfirmarSenha = document.querySelector("#img-olho-confirmar-senha")

imgOlhoSenha.addEventListener("click",(e)=>{
    if (senha.type === "password") {
        senha.type = "text"
        imgOlhoSenha.src = '../imagens/Olho aberto.png'
    }else{
        senha.type = "password"
        imgOlhoSenha.src = '../imagens/Olho fechado.png'
    }
})


imgOlhoConfirmarSenha.addEventListener("click",(e)=>{
    if (confirmarSenha.type === "password") {
        confirmarSenha.type = "text"
        imgOlhoConfirmarSenha.src = '../imagens/Olho aberto.png'
    }else{
        confirmarSenha.type = "password"
        imgOlhoConfirmarSenha.src = '../imagens/Olho fechado.png'
    }
})


function isEmailValid(email) {
    const emailRegex = new RegExp(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    );

    return emailRegex.test(email);
}

function validarTelefone(telefone) {
    
    telefone.value = telefone.value.replace(/\D/g, '');

    telefone.value = telefone.value.slice(0, 11);

    if (telefone.value.length === 10) {

       telefone.value =  telefone.value.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
       return

    } else if (telefone.value.length === 11) {

       telefone.value = telefone.value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
       return
    }

    return '';
}


let dataMinima = new Date();
dataMinima.setFullYear(dataMinima.getFullYear() - 18);


let dataMinimaFormatada = dataMinima.toISOString().slice(0, 10);


dataNascimento.setAttribute('max', dataMinimaFormatada);



confirmarSenha.addEventListener("input",(e)=>{
    if (confirmarSenha.value !== senha.value) {
        confirmarSenha.style.border = " 3px solid red"
        senha.style.border = " 3px solid red"
        
    }else{
        confirmarSenha.style.border = " 3px solid green"
        senha.style.border = " 3px solid green"
        
    }
})

function validarLetras(input) {
    input.value = input.value.replace(/[^a-zA-Záàâãéèêíïóôõöúçñ\s]/g, '');
}

nomeCompleto.addEventListener("input",(e)=>{

    validarLetras(nomeCompleto)
    validarInput(nomeCompleto.value)

})

function validarInput(input) {
    let trimmedInput = input.trim();
    if (trimmedInput === '') {
        return '';
    } else {
        return true; 
    }
}

telefone.addEventListener("input",(e)=>{

    validarTelefone(telefone)

})

botao.addEventListener("click", (event) => {
   
    if (nomeCompleto.value =="" || validarInput(nomeCompleto.value) ===   '' ) {
        nomeCompleto.style.border = " 3px solid red"
        nomeCompleto.placeholder = "Preencha seu nome"
        return
    }else{
        nomeCompleto.style.border = " 3px solid green"
        nomeCompleto.placeholder = ""
    }
   
    if (cpf.value == "" || !validaCPF(cpf.value)) {
        cpf.style.border = " 3px solid red"
        cpf.placeholder = "Preencha seu CPF"
        return
    }else{
        cpf.style.border = " 3px solid green"
        cpf.placeholder = ""
    }

    if (dataNascimento.value == "" || dataNascimento.value > dataMinimaFormatada) {
        dataNascimento.style.border = " 3px solid red"
        return
    }else{
          dataNascimento.style.border = " 3px solid green"
    }


    if (email.value == "" || !isEmailValid(email.value))  {
        email.style.border = " 3px solid red"
        email.placeholder = "Preencha seu email"
        return
    }else{
        email.style.border = " 3px solid green"
        email.placeholder = ""
    }

    if (telefone.value == "" || validarTelefone(telefone) ===   '' ) {
        telefone.style.border = " 3px solid red"
        telefone.placeholder = "Preencha seu telefone"
        return
    }else{
        telefone.style.border = " 3px solid green"
        telefone.placeholder = ""
    }

    const senhaValue = senha.value;
    const confirmarSenhaValue = confirmarSenha.value;
    const senhaRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#¨])[A-Za-z\d@$!%*?&#¨]{8,}$/;

    if ((senha.value == "") || !senhaRegex.test(senhaValue)) {
        senha.style.border = " 3px solid red"
       
        senha.placeholder = "Preencha sua senha"
        return
    }else if (senhaValue !== confirmarSenhaValue) {
        console.log('As senhas não correspondem.');
        return
    }else{
        console.log('Senha válida!');
    }

    if (confirmarSenha.value == "") {
        confirmarSenha.style.border = " 3px solid red"
        confirmarSenha.placeholder = "Preencha sua senha"
        return
    }
    

    if (cpf.value.length < 11) {
        console.log("campo CPF não preenchido corretamente.")
        return
    }


    console.log(nomeCompleto.value)

    fetch("http://localhost:3000/api/usuario",{
        method: "POST",
        headers:{
            'accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            nome: nomeCompleto.value,
            nascimento : dataNascimento.value,
            email : email.value,
            senha : senha.value,
            cpf : cpf.value,
            telefone : telefone.value
        })
    }).then(
        response => response.json()
    ).then(
        html => console.log(html)
    )
    window.location.href = "login.html";
  

});

const invalidos = [
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999'
];

cpf.addEventListener("input", (event) => {
    let currentValue = cpf.value;
    let formattedValue = currentValue.replace(/[^0-9]/g, '');

    if (event.inputType === "deleteContentBackward") {
        formattedValue = formattedValue.slice(0, -1);
    }

    let newValue = '';
    for (let i = 0; i < formattedValue.length; i++) {
        if (i === 3 || i === 6) {
            newValue += '.';
        }
        if (i === 9) {
            newValue += '-';
        }
        newValue += formattedValue[i];
    }

    cpf.value = newValue;
});

const validaCPF = (cpf) => {

    cpf = cpf.replace(/\D/g, "")

    console.log

    if(cpf.length !== 11){
        console.clear()
        console.error("Campo cpf não foi preenchido corretamente.")
        return
    }

    const proximoDigitoVerificador = (cpfIncompleto) => {
        
        let somatoria = 0

        for (let index = 0; index < cpfIncompleto.length; index++) {

            let digitoAtual = cpfIncompleto.charAt(index)

            let constante = (cpfIncompleto.length + 1 - index)

            somatoria += Number(digitoAtual) * constante

        }

        const resto = somatoria % 11
        return resto < 2 ? "0" : (11 - resto).toString()
    }

    let primeiroDigitoVerificador = proximoDigitoVerificador(cpf.substring(0, 9))
    let segundoDigitoVerificador = proximoDigitoVerificador(cpf.substring(0, 9) + primeiroDigitoVerificador)
    
    let cpfCorreto = cpf.substring(0, 9) + primeiroDigitoVerificador + segundoDigitoVerificador

    if(cpf !== cpfCorreto) {
        console.log("CPF inválido")
        return false
    }

    if (invalidos.includes(cpf)) {
        console.log("CPF inválido")
        return false;
    }
    console.log("CPF Válido")
    return true
}