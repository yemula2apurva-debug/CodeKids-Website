
/* ================= CHALLENGE DATA ================= */

const challenges = {

    1: {
        title: "Hello World",
        icon: "👋",
        question: 'Write JavaScript code that prints "Hello World".',
        answer: ["console.log", "hello world"],
        hint: 'Use console.log("Hello World");',
        points: 10
    },

    2: {
        title: "Add Two Numbers",
        icon: "➕",
        question: "Write code to add two numbers.",
        answer: ["+", "console.log"],
        hint: "Use the + operator to add numbers.",
        points: 10
    },

    3: {
        title: "Even or Odd",
        icon: "🔢",
        question: "Write code to check whether a number is even or odd.",
        answer: ["%", "2", "if"],
        hint: "Use the modulus (%) operator.",
        points: 10
    },

    4: {
        title: "Largest Number",
        icon: "🔍",
        question: "Write code to find the largest number from three numbers.",
        answer: ["Math.max"],
        hint: "Try using Math.max().",
        points: 10
    },

    5: {
        title: "Multiplication Table",
        icon: "✖️",
        question: "Write code to print a multiplication table.",
        answer: ["for", "*"],
        hint: "A for loop can help you repeat the calculation.",
        points: 20
    },

    6: {
        title: "Reverse a Number",
        icon: "🔄",
        question: "Write JavaScript code to reverse a number.",
        answer: ["reverse"],
        hint: "Convert the number into a string and use reverse().",
        points: 20
    },

    7: {
        title: "Count Vowels",
        icon: "🔤",
        question: "Write code to count vowels in a word.",
        answer: ["a", "e", "i", "o", "u"],
        hint: "Check the letters against a, e, i, o, u.",
        points: 20
    },

    8: {
        title: "Factorial",
        icon: "🔢",
        question: "Write code to calculate the factorial of a number.",
        answer: ["for", "*"],
        hint: "Use a loop to multiply numbers.",
        points: 20
    },

    9: {
        title: "Prime Number",
        icon: "🔢",
        question: "Write code to check whether a number is prime.",
        answer: ["for", "%"],
        hint: "Check if the number is divisible by other numbers.",
        points: 30
    },

    10: {
        title: "Fibonacci Series",
        icon: "🔢",
        question: "Write JavaScript code to create a Fibonacci series.",
        answer: ["fibonacci"],
        hint: "Each number is the sum of the previous two numbers.",
        points: 30
    },

    11: {
        title: "Number Guessing",
        icon: "🎯",
        question: "Create a simple number guessing game.",
        answer: ["random", "prompt"],
        hint: "Use Math.random() and prompt().",
        points: 30
    },

    12: {
        title: "Find the Bug",
        icon: "🕵️",
        question: "Find and fix the error in a JavaScript program.",
        answer: ["="],
        hint: "Check carefully whether you are using = or == / ===.",
        points: 30
    }

};


/* ================= VARIABLES ================= */

let currentChallenge = null;

let score = 0;

let solved = 0;

let streak = 0;

let completedChallenges = [];


/* ================= START CHALLENGE ================= */

function startChallenge(id) {

    currentChallenge = challenges[id];

    document.getElementById("modalIcon").textContent =
        currentChallenge.icon;

    document.getElementById("modalTitle").textContent =
        currentChallenge.title;

    document.getElementById("modalQuestion").textContent =
        currentChallenge.question;

    document.getElementById("codeInput").value = "";

    document.getElementById("result").style.display = "none";

    document.getElementById("result").textContent = "";

    document.getElementById("challengeModal").style.display =
        "flex";
}


/* ================= CLOSE ================= */

function closeChallenge() {

    document.getElementById("challengeModal").style.display =
        "none";
}


/* ================= CHECK ANSWER ================= */

function checkAnswer() {

    if (!currentChallenge) {
        return;
    }

    const code =
        document.getElementById("codeInput")
        .value
        .toLowerCase()
        .trim();

    const result =
        document.getElementById("result");


    if (code.length < 5) {

        result.style.display = "block";

        result.textContent =
            "✍️ Please write some code first!";

        return;
    }


    let correct = true;


    /*
       This is a beginner-friendly
       keyword-based checker.
    */

    for (let keyword of currentChallenge.answer) {

        if (!code.includes(keyword.toLowerCase())) {

            correct = false;

            break;
        }

    }


    if (correct) {

        if (!completedChallenges.includes(currentChallenge.title)) {

            score += currentChallenge.points;

            solved++;

            streak++;

            completedChallenges.push(
                currentChallenge.title
            );

            updateScore();

            result.style.display = "block";

            result.textContent =
                "🎉 Excellent! Challenge Solved! +" +
                currentChallenge.points +
                " Points";

        } else {

            result.style.display = "block";

            result.textContent =
                "🏆 You already solved this challenge!";

        }

    } else {

        streak = 0;

        updateScore();

        result.style.display = "block";

        result.textContent =
            "❌ Not quite! Try again or use the Hint 💡";
    }

}


/* ================= HINT ================= */

function showHint() {

    if (!currentChallenge) {
        return;
    }

    const result =
        document.getElementById("result");

    result.style.display = "block";

    result.textContent =
        "💡 Hint: " +
        currentChallenge.hint;
}


/* ================= UPDATE SCORE ================= */

function updateScore() {

    document.getElementById("score").textContent =
        score;

    document.getElementById("solved").textContent =
        solved;

    document.getElementById("streak").textContent =
        streak;
}


/* ================= FILTER ================= */

function filterChallenges(level) {

    const cards =
        document.querySelectorAll(".challenge-card");

    const buttons =
        document.querySelectorAll(".filter-buttons button");


    buttons.forEach(button => {

        button.classList.remove("active");

    });


    event.target.classList.add("active");


    cards.forEach(card => {

        if (level === "all") {

            card.style.display = "block";

        }

        else if (card.classList.contains(level)) {

            card.style.display = "block";

        }

        else {

            card.style.display = "none";

        }

    });

}


/* ================= CLOSE ON OUTSIDE CLICK ================= */

window.onclick = function(event) {

    const modal =
        document.getElementById("challengeModal");

    if (event.target === modal) {

        closeChallenge();

    }

};

