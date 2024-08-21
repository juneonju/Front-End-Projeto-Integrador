const containerAcoes = document.querySelector("#container-acoes")
const containerBDRs = document.querySelector("#container-BDRs")
const containerFund = document.querySelector("#container-fundos")

window.onload = ()=>{
    buscarDados()
}

function buscarDados(){
    let url = "https://brapi.dev/api/quote/list?limit=100&token=jCwqXxVNK97bbGxSXjfm8v";
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
           containerAcoes.appendChild(divAcao)
           divAcao.appendChild(divImgAcao)
           divImgAcao.appendChild(imgAcao)
           divImgAcao.appendChild(nameAcao)
           
           
           
           divAcao.className = "divAcao"
           divImgAcao.className = "divImgAcao"
           
           nameAcao.className = "nameAcao"
           imgAcao.src = resposta.stocks[index].logo
           nameAcao.textContent = resposta.stocks[index].name
           console.log(resposta.stocks[index])

        }        
        }
    }

    let urlBDR = "https://brapi.dev/api/quote/list?limit=100&type=bdr&token=jCwqXxVNK97bbGxSXjfm8v";
    let requestbdr = new XMLHttpRequest();
    requestbdr.open("GET", urlBDR);
    requestbdr.send();
    requestbdr.onload = () => { 
        let respostabdr = requestbdr.response;
        respostabdr = JSON.parse(respostabdr)
        console.log(respostabdr.stocks);
        
        for (let index = 0; index < respostabdr.stocks.length; index++) {
           
           if (respostabdr.stocks[index].logo !== "https://brapi.dev/favicon.svg") {

           let divImgAcao = document.createElement('div')
           let divAcao = document.createElement('div')
           let imgAcao = document.createElement('img') 
           let nameAcao = document.createElement('p')
           containerBDRs.appendChild(divAcao)
           divAcao.appendChild(divImgAcao)
           divImgAcao.appendChild(imgAcao)
           divImgAcao.appendChild(nameAcao)
           
           
           
           divAcao.className = "divAcao"
           divImgAcao.className = "divImgAcao"
           nameAcao.className = "nameAcao"
           imgAcao.src = respostabdr.stocks[index].logo
           nameAcao.textContent = respostabdr.stocks[index].name
           console.log(respostabdr.stocks[index])

        }
           
           
                 
        }
        
    }
    let urlfund = "https://brapi.dev/api/quote/list?&limit=100&type=fund&token=jCwqXxVNK97bbGxSXjfm8v";
    let fund = new XMLHttpRequest();
    fund.open("GET", urlfund);
    fund.send();
    fund.onload = () => { 
        let respostafund = fund.response;
        respostafund = JSON.parse(respostafund)
        console.log(respostafund.stocks);
        
        for (let index = 0; index < respostafund.stocks.length; index++) {
           
           if (respostafund.stocks[index].logo !== "https://brapi.dev/favicon.svg") {

           let divImgAcao = document.createElement('div')
           let divAcao = document.createElement('div')
           let imgAcao = document.createElement('img') 
           let nameAcao = document.createElement('p')
           containerFund.appendChild(divAcao)
           divAcao.appendChild(divImgAcao)
           divImgAcao.appendChild(imgAcao)
           divImgAcao.appendChild(nameAcao)
           
           
           
           divAcao.className = "divAcao"
           divImgAcao.className = "divImgAcao"
           nameAcao.className = "nameAcao"
           imgAcao.src = respostafund.stocks[index].logo
           nameAcao.textContent = respostafund.stocks[index].name
           console.log(respostafund.stocks[index])

        }
           
           
                 
        }
        
    }

}
