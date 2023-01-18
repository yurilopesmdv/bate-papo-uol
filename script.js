function alteraMenu() {
    const menuLateral = document.querySelector('.menu-lateral');
    const fundo = document.querySelector('.fundo-tela');
    menuLateral.classList.toggle('esconder-lateral');
    fundo.classList.toggle('esconder-fundo');
}