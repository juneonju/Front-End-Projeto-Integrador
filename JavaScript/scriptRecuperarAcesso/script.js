const form = document.querySelector("#form");
const email = document.querySelector("#box1");
const continuarBtn = document.querySelector("#Continuar");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (email.value === "" || !isEmailValid(email.value)) {
        email.style.border = " 3px solid red"
        email.placeholder = "Preencha seu nome"
        return;
    }

    window.location.href = "atualizarSenha.html";
});

function isEmailValid(email) {
    const emailRegex = new RegExp(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    );

    return emailRegex.test(email);
}