/*Seleciona o elemento HTML pelo seu respectivo id e o armazena*/
const input = document.querySelector('.login-input');
const button = document.querySelector('.login-button');
const form = document.querySelector('.login-form');

/*Torna o botão desabilitado ou não, dependendo do tamanho do nome do usuário*/
const validateInput = ({ target }) => {
    if(target.value.length > 2){
        button.removeAttribute('disabled');
    }else{
        button.setAttribute('disabled', '');
    }
}

/* Permite que a página do jogo seja exibida ao enviar o 
formulário com o nome do player*/
const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('player', input.value);
    window.location = '../pages/game.html';
}

/*Adiciona um evento ao input (o de validação) e ao form 
(de exibir a página do jogo) */
input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);
