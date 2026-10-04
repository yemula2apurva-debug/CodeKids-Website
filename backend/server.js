const express = require("express");
const cors = require("cors");
const path = require("path");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(express.json());

// =====================================
// FRONTEND FOLDER
// =====================================

const frontendPath = path.join(
    __dirname,
    "../frontend/public"
);

// =====================================
// MAIN WEBSITE
// =====================================

// http://localhost:5000/
// open karne par Register Page
app.get("/", (req, res) => {

    res.sendFile(
        path.join(frontendPath, "Register.html")
    );

});

// =====================================
// HOME PAGE
// =====================================

// http://localhost:5000/index.html
app.get("/index.html", (req, res) => {

    res.sendFile(
        path.join(frontendPath, "index.html")
    );

});

// =====================================
// REGISTER PAGE
// =====================================

// http://localhost:5000/Register.html
app.get("/Register.html", (req, res) => {

    res.sendFile(
        path.join(frontendPath, "Register.html")
    );

});

// =====================================
// OTHER FRONTEND FILES
// =====================================

app.use(
    express.static(frontendPath)
);

// =====================================
// MYSQL CONNECTION
// =====================================

const db = mysql.createConnection({

    host: "localhost",

    user: "root",

    password: "backspace@11745",

    database: "codekids"

});

// =====================================
// MYSQL CONNECT
// =====================================

db.connect((err) => {

    if (err) {

        console.log(
            "MySQL connection failed:",
            err.message
        );

    } else {

        console.log(
            "MySQL connected successfully ✅"
        );

    }

});

// =====================================
// BACKEND TEST
// =====================================

app.get("/HomePage", (req, res) => {

    res.send(
        "CodeKids Backend is Running 🚀"
    );

});

// =====================================
// REGISTER API
// =====================================

app.post("/register", (req, res) => {

    const {
        name,
        email,
        password
    } = req.body;

    const sql = `
        INSERT INTO users
        (name, email, password)
        VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [name, email, password],
        (err, result) => {

            // =================================
            // ERROR
            // =================================

            if (err) {

                console.log(err);

                // Email already exists
                if (err.code === "ER_DUP_ENTRY") {

                    return res.status(400).json({

                        message:
                            "Email already registered"

                    });

                }

                return res.status(500).json({

                    message:
                        "Registration failed"

                });

            }

            // =================================
            // SUCCESS
            // =================================

            res.json({

                message:
                    "Registration successful ✅",

                userId:
                    result.insertId

            });

        }
    );

});

// =====================================
// START SERVER
// =====================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {

    console.log(
        `Server running on port ${PORT}`
    );

});