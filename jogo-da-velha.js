//alert("JS carregou");

// Espera o HTML carregar completamente antes de executar o JS
// Isso evita erro de "não funciona ao clicar"
document.addEventListener("DOMContentLoaded", () => {


// =============================
// VARIÁVEIS DO JOGO
// =============================

// Array que representa o tabuleiro (9 posições)
let board = ["","","","","","","","",""];

// Controla se o jogo ainda está ativo
let gameActive = true;

// jogador humano e IA
const human = "X";
const ai = "O";


// =============================
// PEGANDO ELEMENTOS DO HTML
// =============================

// seleciona todas as casas do jogo
const cells = document.querySelectorAll(".cell");

// texto que mostra status (quem joga)
const statusText = document.getElementById("status");

// texto que mostra quantidade de vitórias
const winsText = document.getElementById("wins");


// =============================
// LOCAL STORAGE (salvar vitórias)
// =============================

// pega número salvo no navegador
let wins = localStorage.getItem("wins") || 0;

// mostra na tela
winsText.innerText = wins;


// =============================
// COMBINAÇÕES DE VITÓRIA
// =============================

const winConditions = [
    [0,1,2], // linha superior
    [3,4,5], // linha meio
    [6,7,8], // linha baixo
    [0,3,6], // coluna esquerda
    [1,4,7], // coluna centro
    [2,5,8], // coluna direita
    [0,4,8], // diagonal
    [2,4,6]  // diagonal
];


// =============================
// EVENTO DE CLICK NAS CASAS
// =============================

// percorre cada célula e adiciona evento click
cells.forEach(cell => {

    cell.addEventListener("click", () => {

        // pega índice da célula clicada
        const index = cell.dataset.index;

        // impede clicar em casa ocupada ou jogo finalizado
        if(board[index] !== "" || !gameActive) return;

        // jogador humano faz jogada
        makeMove(index, human);

        // IA joga depois de pequeno atraso
        if(gameActive){
            setTimeout(aiMove, 400);
        }

    });

});


// =============================
// FUNÇÃO PARA FAZER JOGADA
// =============================

function makeMove(index, player){

    // salva jogada no array
    board[index] = player;

    // mostra X ou O na tela
    cells[index].innerText = player;

    // verifica se alguém ganhou
    checkWinner();
}


// =============================
// IA SIMPLES (posição aleatória)
// =============================

function aiMove(){

    // cria lista de posições vazias
    let empty = board
        .map((v,i)=> v==="" ? i : null)
        .filter(v => v !== null);

    // escolhe posição aleatória
    const randomIndex = empty[Math.floor(Math.random()*empty.length)];

    // faz jogada da IA
    makeMove(randomIndex, ai);
}


// =============================
// VERIFICAR VENCEDOR
// =============================

function checkWinner(){

    // percorre todas as combinações
    for(let combo of winConditions){

        const [a,b,c] = combo;

        // verifica se três casas são iguais
        if(board[a] && board[a] === board[b] && board[a] === board[c]){

            // adiciona classe visual de vitória
            cells[a].classList.add("win");
            cells[b].classList.add("win");
            cells[c].classList.add("win");

            gameActive = false;

            // verifica quem venceu
            if(board[a] === human){

                wins++;
                localStorage.setItem("wins", wins);
                winsText.innerText = wins;

                statusText.innerText = "🔥 Você venceu!";
            }else{
                statusText.innerText = "🤖 IA venceu!";
            }

            return;
        }
    }

    // verifica empate (sem espaços vazios)
    if(!board.includes("")){
        statusText.innerText = "😅 Empate!";
        gameActive = false;
    }
}


// =============================
// FUNÇÃO REINICIAR JOGO
// =============================

// adicionamos no window para funcionar com onclick do HTML
window.restartGame = function(){

    // limpa array
    board = ["","","","","","","","",""];

    gameActive = true;

    statusText.innerText = "Sua vez (X)";

    // limpa visual das casas
    cells.forEach(cell => {
        cell.innerText = "";
        cell.classList.remove("win");
    });
}

});
