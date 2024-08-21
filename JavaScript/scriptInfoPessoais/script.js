const cpf = document.querySelector("#Box4");
const nome = document.querySelector("#Box1");
const email = document.querySelector("#Box2");
const telefone = document.querySelector("#Box3");
const nascimento = document.querySelector("#Box5");
const botaoEditar = document.querySelector("#botaoEditar")
const botaoSair = document.querySelector("#botaoSair")
const botaoSalvar = document.querySelector("#botaoSalvar")
const botaoCancelar = document.querySelector("#botaoCancelar")
const usuario = JSON.parse(localStorage.usuariosessao)





window.onload = () =>{
     
    console.log(usuario.id)

    preencherCampus()
}

function preencherCampus(){
    cpf.value = usuario.cpf
    nome.value = usuario.nome
    email.value = usuario.email
    telefone.value = usuario.telefone
    nascimento.value = usuario.nascimento
}

botaoEditar.addEventListener("click", (event) => {
    cpf.disabled = false;
    cpf.style.backgroundColor = "white";
    nome.disabled = false;
    nome.style.backgroundColor = "white";
    email.disabled = false;
    email.style.backgroundColor = "white";
    telefone.disabled = false;
    telefone.style.backgroundColor = "white";
    nascimento.disabled = false;
    nascimento.style.backgroundColor = "white";
    botaoCancelar.disabled = false
    botaoCancelar.style.backgroundColor = "red";
    botaoCancelar.style.color = "white";
    botaoSalvar.disabled = false
    botaoSalvar.style.backgroundColor = "green";
    botaoSalvar.style.color = "white";
})

botaoCancelar.addEventListener("click", (event) => {
    cpf.disabled = true;
    cpf.style.backgroundColor = "rgb(201, 201, 201)";
    nome.disabled = true;
    nome.style.backgroundColor = "rgb(201, 201, 201)";
    email.disabled = true;
    email.style.backgroundColor = "rgb(201, 201, 201)";
    telefone.disabled = true;
    telefone.style.backgroundColor = "rgb(201, 201, 201)";
    nascimento.disabled = true;
    nascimento.style.backgroundColor = "rgb(201, 201, 201)";
    botaoCancelar.disabled = true
    botaoCancelar.style.backgroundColor = "#aaaaaa";
    botaoCancelar.style.color = "white";
    botaoSalvar.disabled = true
    botaoSalvar.style.backgroundColor = "#aaaaaa";
    botaoSalvar.style.color = "white";
    location.reload()
})

botaoSalvar.addEventListener("click", (e)=>{

    if (cpf.value == "") {
        cpf.style.border = "3px solid red"
        return
    }else if (cpf.value.length < 14) {
        console.log("campo CPF não preenchido corretamente.")
        cpf.style.border = " 3px solid red"
        return
    }else if (!validaCPF(cpf.value)){
        cpf.style.border = "3px solid red"
        cpf.placeholder = "Preencha seu CPF"
        return
    }else{
        cpf.style.border = "none"
    }

    if (nome.value == "") {
        nome.style.border = "3px solid red"
        return
    }else if(validarInput(nome.value) ===   ""){
        nome.style.border = " 3px solid red"
        return
    }else{
        nome.style.border = "none"
    }

    if (nascimento == "") {
        nascimento.style.border = "3px solid red"
        return
    }else if(nascimento.value > dataMinimaFormatada){
        nascimento.style.border = "3px solid red"
        return
    }else{
        nascimento.style.border = "none"
    } 

    if (email.value == ""){
        email.style.border = "3px solid red"
        return
    }else if(!isEmailValid(email.value)){
        email.style.border = "3px solid red"
        return
    }else{
        email.style.border = "none"
    } 

    if (telefone.value > 14){
        telefone.style.border = "3px solid red"
        return
    }else if(validarTelefone(telefone) ===   ''){
        telefone.style.border = "3px solid red"
        return
    }else{
        telefone.style.border = "none"
    }  
    
    if((cpf.style.border = "none") && (nome.style.border = "none") && (nascimento.style.border = "none") && (email.style.border = "none") && (telefone.style.border = "none")){
        fetch("http://localhost:3000/api/usuario/alterar",{
            method: "PUT",
            headers:{
                'accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                
                nome: nome.value,
                nascimento : nascimento.value,
                email : email.value,
                cpf : cpf.value,
                telefone : telefone.value,
                id : usuario.id
                
            })
        }).then(
            response => response.json()
        ).then(
            html =>{
                console.log(html)
                localStorage.usuariosessao = JSON.stringify(html.result)
                location.reload()
               
            } 
        )
    }
});

function validarLetras(input) {
    input.value = input.value.replace(/[^a-zA-Záàâãéèêíïóôõöúçñ\s]/g, '');
}

function validarInput(input) {
    let trimmedInput = input.trim();
    if (trimmedInput === '') {
        return ''; 
    } else {
        return true; 
    }
}

nome.addEventListener("input",(e)=>{
    validarLetras(nome)
    validarInput(nome.value)
})

let dataMinima = new Date();
dataMinima.setFullYear(dataMinima.getFullYear() - 18);

let dataMinimaFormatada = dataMinima.toISOString().slice(0, 10);

nascimento.setAttribute('max', dataMinimaFormatada);

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

telefone.addEventListener("input",(e)=>{

    validarTelefone(telefone)

})

function isEmailValid(email) {
    const emailRegex = new RegExp(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    );

    return emailRegex.test(email);
}

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