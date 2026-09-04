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

function randomFood() {
    return {
        x: Math.floor(Math.random() * (canvas.width / box)) * box,
        y: Math.floor(Math.random() * (canvas.height / box)) * box,
        word: codingWords[Math.floor(Math.random() * codingWords.length)]
    };
}

function startGame() {

    snake = [
        { x: 250, y: 250 },
        { x: 225, y: 250 },
        { x: 200, y: 250 }
    ];

    direction = "RIGHT";

    food = randomFood();

    score = 0;

    scoreText.textContent = score;

    clearInterval(game);

    game = setInterval(drawGame, 150);
}

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {

    const key = event.key;

    if (key === "ArrowLeft" && direction !== "RIGHT") {
        direction = "LEFT";
    }

    if (key === "ArrowUp" && direction !== "DOWN") {
        direction = "UP";
    }

    if (key === "ArrowRight" && direction !== "LEFT") {
        direction = "RIGHT";
    }

    if (key === "ArrowDown" && direction !== "UP") {
        direction = "DOWN";
    }
}

function collision(head, body) {

    for (let i = 0; i < body.length; i++) {

        if (head.x === body[i].x &&
            head.y === body[i].y) {

            return true;
        }
    }

    return false;
}

function drawGame() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    for (let i = 0; i < snake.length; i++) {

        ctx.fillStyle = i === 0 ? "#183d7a" : "#118ceb";

        ctx.fillRect(
            snake[i].x,
            snake[i].y,
            box - 2,
            box - 2
        );
    }

    // Draw coding word
    ctx.fillStyle = "#ffd43b";

    ctx.fillRect(food.x, food.y, box, box);

    ctx.fillStyle = "#000";

    ctx.font = "bold 10px Arial";
    ctx.textAlign = "center";

    ctx.fillText(
        food.word,
        food.x + box / 2,
        food.y + 16
    );

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

    // Eat coding word
    if (snakeX === food.x && snakeY === food.y) {

        score++;

        scoreText.textContent = score;

        food = randomFood();

    } else {

        snake.pop();
    }

    const newHead = {
        x: snakeX,
        y: snakeY
    };

    // Game over
    if (
        snakeX < 0 ||
        snakeY < 0 ||
        snakeX >= canvas.width ||
        snakeY >= canvas.height ||
        collision(newHead, snake)
    ) {

        clearInterval(game);

        alert("Game Over! Your Score: " + score);

        return;
    }

    snake.unshift(newHead);
}

document.getElementById("restartBtn").addEventListener(
    "click",
    startGame
);

startGame();


