// Tela
var tamanhoBlocos = 25;
var linhas = 20; 
var colunas = 20;
var board;
var context;

// cobra
var snakeX = tamanhoBlocos * 5;
var snakeY = tamanhoBlocos * 5;
var veloX = 0;
var veloY = 0;
var corpoSnake = [];

// maça
var macaX;
var macaY;
var gameOver = false;

window.onload = function(){
    board = document.getElementById("board");
    board.height = linhas * tamanhoBlocos;
    board.width = colunas * tamanhoBlocos;
    context = board.getContext("2d");

    localMaca();
    document.addEventListener("keyup", mudarDirecao);
    
    setInterval(update, 1000/10);
}

function update(){
    if (gameOver){
        return;
    }

    context.fillStyle ="black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle="red"
    context.fillRect(macaX, macaY, tamanhoBlocos, tamanhoBlocos);

    if (snakeX == macaX && snakeY == macaY){
        corpoSnake.push([macaX, macaY])
        localMaca();
    }

    for (let i =corpoSnake.length-1; i > 0; i--){
        corpoSnake[i] = corpoSnake[i-1];
    }
    if (corpoSnake.length){
        corpoSnake[0] = [snakeX, snakeY];
    }

    context.fillStyle="lime"
    snakeX += veloX * tamanhoBlocos;
    snakeY += veloY * tamanhoBlocos; 
    context.fillRect(snakeX, snakeY, tamanhoBlocos, tamanhoBlocos);
    for (let i = 0; i < corpoSnake.length; i++){
        context.fillRect(corpoSnake[i][0], corpoSnake[i][1], tamanhoBlocos, tamanhoBlocos);
    }

    //game over
    if (snakeX < 0 || snakeX > colunas*tamanhoBlocos || snakeY < 0 || snakeY > linhas*tamanhoBlocos){
        gameOver = true;
        alert("Fim de Jogo");
    }

    for (let i = 0; i < corpoSnake.length; i++){
        if (snakeX == corpoSnake[i][0] && snakeY == corpoSnake[i][1]){
            gameOver = true;
            alert = ("Fim de Jogo");
        }
    }
}

function mudarDirecao(e){
    if (e.code == "ArrowUp" &&  veloY != 1){
        veloX = 0;
        veloY = -1;
    }
    else if (e.code == "ArrowDown" && veloY != -1){
        veloX = 0;
        veloY = 1;
    }
    else if (e.code == "ArrowLeft" && veloX != 1){
        veloX = -1;
        veloY = 0;
    }
    else if (e.code == "ArrowRight" && veloX != -1){
        veloX = 1;
        veloY = 0;
    }
}

function localMaca(){
    macaX = Math.floor(Math.random() * colunas) * tamanhoBlocos;
    macaY = Math.floor(Math.random() * linhas) * tamanhoBlocos;
}