/*Seleciona o elemento HTML pela sua classe e o armazena*/
const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

/*Array de personagens*/
const characters = [
    'butters',
    'kennymc',
    'kyle',
    'cartman',
    'wendy',
    'token',
    'stan',
    'paidostan',
    'mrgarrison',
    'cheff'
]

/*Cria um novo elemento HTML com uma tag e uma classe especificadas e 
retorna esse elemento*/
const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

/*Declara duas variáveis e inicializa elas como vazias*/
let firstCard = '';
let secondCard = '';

/*Verifica se o jogo acabou e exibe um alert*/
const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length == 20) {
        clearInterval(this.loop);
        alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi ${timer.innerHTML}`);
    }
}

/*Verificar se duas cartas selecionadas têm o mesmo caractere*/
const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter == secondCharacter) {

        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';

        checkEndGame();
    } else {

        setTimeout(() => {

            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';

        }, 500);
    }
}

/*Revela as cartas do jogo */
const revealCard = ({ target }) => {

    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if (firstCard == '') {

        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;

    } else if (secondCard == '') {

        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();
    }
}

/*Cria as cartas do jogo e atribui uma imagem à frente de cada uma*/
const createCard = (character) => {

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../images/${character}.jpg')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard)
    card.setAttribute('data-character', character);

    return card;
}

/*Duplica os caracteres e embaralha or elementos do array que são 
os nomes das imagens*/
const loadGame = () => {

    const duplicateCharacters = [...characters, ...characters];

    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

    shuffledArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    })
}

/*Calcula o tempo que o usuário levou para terminar jogo*/
const startTimer = () => {
    this.loop = setInterval(() => {
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    }, 1000);
}

/*Define uma função que será executada quando a janela do navegador terminar de
carregar, a qual recupera o nome que o usuário digitou no login para exibir 
na tela e chama duas outras funções, uma para contar o tempo e outra para carregar o jogo*/
window.onload = () => {

    const playerName = localStorage.getItem('player');
    spanPlayer.innerHTML = playerName;

    startTimer();
    loadGame();
}

