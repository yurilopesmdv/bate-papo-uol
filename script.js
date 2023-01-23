let nome;
let body;
let ultimaMensagem;
let destinatario = "Todos";
let typeMessage = "message";
function alteraMenu() {
    const menuLateral = document.querySelector('.menu-lateral');
    const fundo = document.querySelector('.fundo-tela');
    menuLateral.classList.toggle('esconder-lateral');
    fundo.classList.toggle('esconder-fundo');
}
function marcarCheck(li, contato) {
    let selectedAnt = document.querySelector('.selecionado');
    selectedAnt.classList.remove('selecionado');
    li.classList.add('selecionado');
    destinatario = contato;
    
}
function marcarVisibilidade(visibility) {
    typeMessage = "message";
    let selecionadoAnteriormente = document.querySelector('.selected');
    if(selecionadoAnteriormente !== null) {
        selecionadoAnteriormente.classList.remove('selected');
    }
    visibility.classList.add('selected');
    if(visibility.classList.contains("visibilidade-reservado")) {
        typeMessage = "private_message";
    }
   
}
function logIn() {
    nome = document.querySelector('.input-login').value;
    body = {
        name: nome
      }
    if(document.querySelector('.input-login').value === "") {
        alert("Por favor escolha um nome!");
        window.location.reload();
    } else {
        const requisicao = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", body);
    requisicao.then(logar);
    requisicao.catch(nomeInvalido);
    } 
}
function logar(dado) {
    const telaLogin = document.querySelector('.tela-login');
    telaLogin.classList.add('esconder-fundo');
    loadMessages();
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
    promise.catch(reload);
}
function reload() {
    window.location.reload();
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
        } else if(mensagensTela[i].type === "private_message" && (mensagensTela[i].to === nome || mensagensTela[i].from === nome)) {
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
        <li data-test="participant" onclick="marcarCheck(this, '${variavel.data[i].name}')" class="visibilidade-publico">
            <ion-icon name="person-circle"></ion-icon>
            ${variavel.data[i].name}
            <ion-icon data-test="check" class="check" name="checkmark-outline"></ion-icon>
        </li>`
        contato.innerHTML += peopleTemplate;
    }
}
function enviarMensagem() {
    let inputValue = document.querySelector('.footer input').value;
    let message = {
        from: nome,
        to: destinatario,
        text: inputValue,
        type: typeMessage
    };
    console.log(message);
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', message);
    document.querySelector('.footer input').value = "";
    promise.then(enviou);
    promise.catch(naoEnviou);

}
function enviou() {
    loadMessages();
}
function naoEnviou(erro) {
    window.location.reload();
}

function stayLoad() {
    let status = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", body);
}

function loadChat() {
    loadPeople();
    logIn();

    setInterval(loadMessages, 3000);
    setInterval(stayLoad, 5000);
    setInterval(loadPeople, 10000)
}
document.addEventListener("keyup",function (evento){
    if(evento.key === "Enter") {
        enviarMensagem();
    }
})
