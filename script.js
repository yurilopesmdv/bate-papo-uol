let urlApi = "https://mock-api.driven.com.br/api/v6/uol/"
let nome;
let ultimaMensagem;
function alteraMenu() {
    const menuLateral = document.querySelector('.menu-lateral');
    const fundo = document.querySelector('.fundo-tela');
    menuLateral.classList.toggle('esconder-lateral');
    fundo.classList.toggle('esconder-fundo');
}
function logIn() {
    
    nome = {
        name: `"${document.querySelector('.input-login').value}"`
      }
      
    const requisicao = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants ", nome);
    requisicao.then(logar);
    requisicao.catch(nomeInvalido);
    
}
function logar(dado) {
    const telaLogin = document.querySelector('.tela-login');
    telaLogin.classList.add('esconder-fundo');
}
function nomeInvalido(erro) {
    if(erro.response.status == "400"){
        alert('Nome já utilizado, escolha outro!');
        window.location.reload();
    }
}
function loadMessages() {
    let promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promise.then(renderMessages);
    //promise.catch();
}
function renderMessages(answer) {
    let mensagensTela = answer.data;
    
    let ulMessage = document.querySelector('.mensagens-content');
    ulMessage.innerHTML = "";
    
    for(i = 0; i < answer.data.length; i++) {
        if(mensagensTela[i].type === "status") {
            ulMessage.innerHTML += `<li data-test="message" class="status" >${mensagensTela[i].time} <strong>${mensagensTela[i].from}</strong>  ${mensagensTela[i].text}</li>`;
        } else if(mensagensTela[i].type === "message") {
            ulMessage.innerHTML += `<li data-test="message" class="msgPublica" >${mensagensTela[i].time} <strong>${mensagensTela[i].from}</strong> para <strong>${mensagensTela[i].to}</strong>: ${mensagensTela[i].text}`
        } else if(mensagensTela[i] === "private_message" && mensagensTela[i].to === nome) {
            ulMessage.innerHTML += `<li data-test="message" class="msgPrivada" >${mensagensTela[i].time} <strong>${mensagensTela[i].from}</strong> reservadamente para <strong>${mensagensTela[i].to}</strong>: ${mensagensTela[i].text}`
        }
    }
    ultimaMensagem = mensagensTela[mensagensTela.length - 1].time;
    rolarPagina(ultimaMensagem);
}
function rolarPagina(ultimaMensagem) {
    document.querySelector('.mensagens-content li:last-child').scrollIntoView();
    
}
function loadPeople() {
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
    promise.then(renderPeople);
}
function renderPeople(variavel) {
    const contato = document.querySelector('.contatos');
    for(i = 0; i < variavel.data.length; i++) {
        const peopleTemplate = ` 
        <li data-test="participant" onclick="marcarCheck()" class="visibilidade-publico">
            <ion-icon name="person-circle"></ion-icon>
            ${variavel.data[i].name}
            <ion-icon data-test="check" class="check" name="checkmark-outline"></ion-icon>
        </li>`
        contato.innerHTML += peopleTemplate;
    }
}

function stayLoad() {
    let status = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", nome);
}

function loadChat() {
    loadPeople();
    logIn();

    setInterval(loadMessages, 3000);
    setInterval(stayLoad, 5000);
}
