// =======================
// VARIÁVEIS DO JOGO
// =======================

// jogador atual começa com X
let currentPlayer = "X";

// array que guarda estado do tabuleiro
// cada posição representa uma casa
let board = ["","","","","","","","",""];

// controla se o jogo ainda está ativo
let gameActive = true;


// combinações possíveis de vitória
// índices correspondem às casas
const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


// seleciona elementos do HTML
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");


// =======================
// EVENTO DE CLICK
// =======================

// adiciona evento para cada célula
cells.forEach(cell => {

    cell.addEventListener("click", () => {

        // pega índice da célula clicada
        const index = cell.dataset.index;

        // evita jogar em casa já usada
        // ou quando jogo terminou
        if(board[index] !== "" || !gameActive) return;

        // registra jogada no array
        board[index] = currentPlayer;

        // mostra X ou O na tela
        cell.innerText = currentPlayer;

        // verifica se alguém ganhou
        checkWinner();

        // alterna jogador
        currentPlayer = currentPlayer === "X" ? "O" : "X";

        // atualiza texto
        statusText.innerText = "Vez do jogador " + currentPlayer;
    });

});


// =======================
// VERIFICA VENCEDOR
// =======================

function checkWinner(){

    let roundWon = false;

    // percorre combinações
    for(let i=0; i < winConditions.length; i++){

        const [a,b,c] = winConditions[i];

        // verifica se três posições são iguais
        if(board[a] && board[a] === board[b] && board[a] === board[c]){
            roundWon = true;
            break;
        }
    }

    // se venceu
    if(roundWon){
        statusText.innerText = "🏆 Jogador venceu!";
        gameActive = false;
        return;
    }

    // verifica empate (sem espaços vazios)
    if(!board.includes("")){
        statusText.innerText = "😅 Empate!";
        gameActive = false;
    }
}


// =======================
// REINICIAR JOGO
// =======================

function restartGame(){

    // limpa array
    board = ["","","","","","","","",""];

    // reativa jogo
    gameActive = true;

    // jogador volta para X
    currentPlayer = "X";

    // atualiza texto
    statusText.innerText = "Vez do jogador X";

    // limpa visual das casas
    cells.forEach(cell => cell.innerText = "");
}
