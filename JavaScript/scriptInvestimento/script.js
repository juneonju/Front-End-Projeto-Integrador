const areaDivsApi = document.querySelector("#areaDivsApi")
const fundos = document.querySelector("#fundos")
const bdrs = document.querySelector("#bdrs")
const acoes = document.querySelector("#acoes")
const container = document.querySelector("#container")

var informacao = "type=stock"

window.onload = ()=>{
    buscarDados()
}

fundos.addEventListener("click",(e)=>{
    informacao = "type=fund"
    areaDivsApi.textContent = ""
    container.style.background ="#979696"
    buscarDados()
})


bdrs.addEventListener("click",(e)=>{
    informacao = "type=bdr"
    container.style.background ="#BABABA"
    areaDivsApi.textContent = ""
    buscarDados()
})

acoes.addEventListener("click",(e)=>{
    informacao = "type=stock"
    container.style.background ="#D9D9D9"
    areaDivsApi.textContent = ""
    buscarDados()
})


function buscarDados(){
    let url = "https://brapi.dev/api/quote/list?" + informacao + "&limit=100&token=jCwqXxVNK97bbGxSXjfm8v";
    let request = new XMLHttpRequest();
    request.open("GET", url);
    request.send();
    request.onload = () => {

        let resposta = request.response;
        resposta = JSON.parse(resposta)
        console.log(resposta.stocks);
        
        for (let index = 0; index < resposta.stocks.length; index++) {
           
           if (resposta.stocks[index].logo !== "https://brapi.dev/favicon.svg") {

           let divImgAcao = document.createElement('div')
           let divAcao = document.createElement('div')
           let imgAcao = document.createElement('img') 
           let nameAcao = document.createElement('p')
           let precoAcao = document.createElement('p')
           let rentabilidadeAcao = document.createElement('p')
           let siglaAcao = document.createElement('p')
           let setorAcao = document.createElement('p')
           let botao = document.createElement('button')
           botao.textContent = "investir"
           botao.className = "botaoInvestir"
           areaDivsApi.appendChild(divAcao)
           divAcao.appendChild(divImgAcao)
           divImgAcao.appendChild(imgAcao)
           divImgAcao.appendChild(nameAcao)
           divImgAcao.appendChild(siglaAcao)
           divImgAcao.appendChild(setorAcao)
           divImgAcao.appendChild(rentabilidadeAcao)
           divImgAcao.appendChild(precoAcao)
           

           nameAcao.className = "nomeAcao"
           rentabilidadeAcao.className ="nomeAcao"
           precoAcao.className ="nomeAcao"
           setorAcao.className ="nomeAcao"
           siglaAcao.className ="nomeAcao"
           divAcao.className = "divAcao"
           divImgAcao.className = "divImgAcao"
           imgAcao.src = resposta.stocks[index].logo
           nameAcao.textContent = resposta.stocks[index].name
           rentabilidadeAcao.textContent = resposta.stocks[index].change.toFixed(2) + "%"
           precoAcao.textContent = "R$"+resposta.stocks[index].close 
           setorAcao.textContent = resposta.stocks[index].sector
           siglaAcao.textContent = resposta.stocks[index].stock
           console.log(resposta.stocks[index])

        }        
        }
    }

}