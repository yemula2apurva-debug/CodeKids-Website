function checkAnswer(answer) {

    let result = document.getElementById("result");

    if (answer === "correct") {

        result.innerHTML = "🎉 Correct Answer!";

        result.style.color = "green";

    } else {

        result.innerHTML = "❌ Wrong Answer. Try Again!";

        result.style.color = "red";
    }
}

const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");

const box = 25;

let snake;
let food;
let direction;
let score;
let game;

const scoreText = document.getElementById("score");

const codingWords = ["HTML", "CSS", "JS"];


/* =========================
   CREATE RANDOM FOOD
========================= */

function randomFood() {

    let newFood;

    do {
        newFood = {
            x: Math.floor(Math.random() * (canvas.width / box)) * box,
            y: Math.floor(Math.random() * (canvas.height / box)) * box,
            word: codingWords[
                Math.floor(Math.random() * codingWords.length)
            ]
        };

    } while (
        snake &&
        snake.some(part =>
            part.x === newFood.x &&
            part.y === newFood.y
        )
    );

    return newFood;
}


/* =========================
   START GAME
========================= */

function startGame() {

    snake = [
        { x: 250, y: 250 },
        { x: 225, y: 250 },
        { x: 200, y: 250 }
    ];

    direction = "RIGHT";

    score = 0;

    scoreText.textContent = score;

    clearInterval(game);

    food = randomFood();

    // Immediately draw snake and food
    drawGame();

    game = setInterval(drawGame, 150);
}


/* =========================
   KEYBOARD CONTROLS
========================= */

document.addEventListener("keydown", function(event) {

    if (event.key === "ArrowLeft") {
        changeDirection("LEFT");
    }

    if (event.key === "ArrowUp") {
        changeDirection("UP");
    }

    if (event.key === "ArrowRight") {
        changeDirection("RIGHT");
    }

    if (event.key === "ArrowDown") {
        changeDirection("DOWN");
    }

});


/* =========================
   BUTTON CONTROLS
========================= */

function changeDirection(newDirection) {

    if (newDirection === "LEFT" && direction !== "RIGHT") {
        direction = "LEFT";
    }

    if (newDirection === "UP" && direction !== "DOWN") {
        direction = "UP";
    }

    if (newDirection === "RIGHT" && direction !== "LEFT") {
        direction = "RIGHT";
    }

    if (newDirection === "DOWN" && direction !== "UP") {
        direction = "DOWN";
    }
}


/* =========================
   COLLISION CHECK
========================= */

function collision(head, body) {

    for (let i = 0; i < body.length; i++) {

        if (
            head.x === body[i].x &&
            head.y === body[i].y
        ) {
            return true;
        }
    }

    return false;
}


/* =========================
   DRAW GAME
========================= */

function drawGame() {

    // Clear canvas
    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    /* =========================
       DRAW SNAKE
    ========================= */

    for (let i = 0; i < snake.length; i++) {

        if (i === 0) {
            // Snake head
            ctx.fillStyle = "#183d7a";
        } else {
            // Snake body
            ctx.fillStyle = "#118ceb";
        }

        ctx.fillRect(
            snake[i].x,
            snake[i].y,
            box - 2,
            box - 2
        );
    }


    /* =========================
       DRAW FOOD
    ========================= */

    ctx.fillStyle = "#ffd43b";

    ctx.fillRect(
        food.x,
        food.y,
        box,
        box
    );


    // Coding word
    ctx.fillStyle = "#000";

    ctx.font = "bold 9px Arial";

    ctx.textAlign = "center";

    ctx.textBaseline = "middle";

    ctx.fillText(
        food.word,
        food.x + box / 2,
        food.y + box / 2
    );


    /* =========================
       NEW SNAKE POSITION
    ========================= */

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;


    if (direction === "LEFT") {
        snakeX -= box;
    }

    if (direction === "UP") {
        snakeY -= box;
    }

    if (direction === "RIGHT") {
        snakeX += box;
    }

    if (direction === "DOWN") {
        snakeY += box;
    }


    /* =========================
       CHECK FOOD
    ========================= */

    let ateFood =
        snakeX === food.x &&
        snakeY === food.y;


    if (ateFood) {

        score++;

        scoreText.textContent = score;

        food = randomFood();

    } else {

        // Remove tail
        snake.pop();

    }


    /* =========================
       CREATE NEW HEAD
    ========================= */

    const newHead = {
        x: snakeX,
        y: snakeY
    };


    /* =========================
       GAME OVER
    ========================= */

    if (
        snakeX < 0 ||
        snakeY < 0 ||
        snakeX >= canvas.width ||
        snakeY >= canvas.height ||
        collision(newHead, snake)
    ) {

        clearInterval(game);

        alert(
            "Game Over! Your Score: " + score
        );

        return;
    }


    /* =========================
       ADD NEW HEAD
    ========================= */

    snake.unshift(newHead);
}


/* =========================
   RESTART BUTTON
========================= */

document
    .getElementById("restartBtn")
    .addEventListener("click", startGame);


/* =========================
   START GAME
========================= */

startGame();

