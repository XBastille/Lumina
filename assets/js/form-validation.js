document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    const nameInput = document.querySelector("#name");
    const emailInput = document.querySelector("#email");
    const messageInput = document.querySelector("#message");
    const submitButton = document.querySelector("#submit");
    
    form.addEventListener("submit", function(event) {
        let valid = true;

        clearErrors();

        if (nameInput.value.trim() === "") {
            showError(nameInput, "Name is required.");
            valid = false;
        }

        if (emailInput.value.trim() === "") {
            showError(emailInput, "Email is required.");
            valid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            showError(emailInput, "Please enter a valid email address.");
            valid = false;
        }

        if (messageInput.value.trim() === "") {
            showError(messageInput, "Message cannot be empty.");
            valid = false;
        }

        if (!valid) {
            event.preventDefault(); 
        }
    });

    function showError(input, message) {
        const error = document.createElement("span");
        error.className = "error-message";
        error.textContent = message;
        input.parentElement.appendChild(error);
    }

    function clearErrors() {
        const errorMessages = document.querySelectorAll(".error-message");
        errorMessages.forEach(function(error) {
            error.remove();
        });
    }

    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
});