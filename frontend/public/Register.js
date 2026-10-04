/* Register */

const registerForm = document.getElementById("registerForm");
const message = document.getElementById("message");

registerForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {

        const response = await fetch("/register", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        });

        const data = await response.json();

        if (response.ok) {

            message.style.color = "green";
            message.textContent = "Registration successful! ✅";

            // Registration complete
            localStorage.setItem("isRegistered", "true");

            registerForm.reset();

            // 1 second ke baad Home page open hoga
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000);

        } 
        else {

            message.style.color = "red";
            message.textContent = data.message;

        }

    } catch (error) {

        console.error(error);

        message.style.color = "red";
        message.textContent = "Server se connection nahi ho raha.";

    }

});