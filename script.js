let urlApi = "https://mock-api.driven.com.br/api/v6/uol/"
let nome = '';
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
    //requisicao.then();
    //requisicao.catch();
    const telaLogin = document.querySelector('.tela-login');
    telaLogin.classList.add('esconder-fundo');
}
function loadMessages() {
    let promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promise.then(renderMessages);
}
function renderMessages(answer) {
    console.log(answer);
}
function stayLoad() {
    let status = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", nome);
}

function loadChat() {
    //loadPeople();
    logIn();

    setInterval(loadMessages, 3000);
    setInterval(stayLoad, 5000);
}
