document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Handle form submission logic (e.g., send data to the server)
    console.log("Form submitted", { email, password });
    alert("Login Successful");
  });

document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Handle form submission logic (e.g., send data to the server)
    console.log("Form submitted", { username, password });
    alert("Login Successful");
  });

// submission logic
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const messageDiv = document.getElementById("message");

  // Display message if available
  if (messageDiv && message) {
    messageDiv.textContent = message;
    messageDiv.className = "message " + messageType;
    messageDiv.style.display = "block";
  }

  if (loginForm) {
    const submitButton = loginForm.querySelector('input[type="submit"]');
    const spinner = document.createElement("span");

    spinner.className = "spinner-border spinner-border-sm";
    spinner.style.display = "none"; // Initially hidden
    submitButton.parentNode.appendChild(spinner);

    loginForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent default form submission

      // Disable the submit button to prevent multiple submissions
      submitButton.disabled = true;

      // Show the loading spinner
      spinner.style.display = "inline-block";

      // Submit the form using JavaScript
      loginForm.submit();
    });
  } else {
    console.error("Login form not found");
  }
});

// GSAP Animations
window.onload = function () {
  gsap.from(".img-fluid", { duration: 1, y: -50, opacity: 0, ease: "bounce" });
  gsap.from("h3", { duration: 1, x: -100, opacity: 0, delay: 0.5 });
  gsap.from("p.mb-4", { duration: 1, x: 100, opacity: 0, delay: 0.5 });
  gsap.from(".form-group", {
    duration: 1,
    y: 50,
    opacity: 0,
    stagger: 0.2,
    delay: 1,
  });
  gsap.from(".btn", {
    duration: 1,
    scale: 0.8,
    opacity: 0,
    stagger: 0.2,
    delay: 1.5,
  });
  gsap.from(".social-login a", { duration: 1, y: 50, opacity: 0, delay: 2 });
};
