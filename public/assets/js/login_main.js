$(function () {
  "use strict";

  $(".form-control").on("input", function () {
    var $field = $(this).closest(".form-group");
    if (this.value) {
      $field.addClass("field--not-empty");
    } else {
      $field.removeClass("field--not-empty");
    }
  });
});

//GSAP Animation
document.getElementById("login-form").onsubmit = function (e) {
  e.preventDefault();
  var formData = new FormData(this);
  for (var pair of formData.entries()) {
    console.log(pair[0] + ": " + pair[1]);
  }
};

// GSAP Animations
// GSAP Animations
window.onload = function () {
  gsap.from(".img-fluid", { duration: 1, y: -50, opacity: 0, ease: "bounce" });
  gsap.from("h3", { duration: 1, x: -100, opacity: 0, delay: 0.5 });
  gsap.from("p.mb-4", { duration: 1, x: 100, opacity: 0, delay: 0.5 });
  gsap.from(".input-group", {
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

  // Ensure the social login section exists
  if (document.querySelectorAll(".social-login a").length) {
    gsap.from(".social-login a", { duration: 1, y: 50, opacity: 0, delay: 2 });
  }

  // Logo hover animation
  const logoChars = document.querySelectorAll("#secure-note-logo text");
  logoChars.forEach((char, i) => {
    char.addEventListener("mouseover", () => {
      gsap.to(char, {
        duration: 0.5,
        rotationY: 360,
        scale: 1.2,
        ease: "power1.inOut",
      });
    });

    char.addEventListener("mouseout", () => {
      gsap.to(char, {
        duration: 0.5,
        rotationY: 0,
        scale: 1,
        ease: "power1.inOut",
      });
    });
  });

  // Floating animation for the entire logo
  gsap.to(".logo", {
    y: 20,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
  });
};
// Add this to main.js

document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    // Simulate server-side username and password verification
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "testuser" && password === "password") {
      // Show the OTP section if username and password are correct
      document.getElementById("otp-section").style.display = "block";
    } else {
      alert("Invalid username or password");
    }
  });

function verifyOtp() {
  const otp = document.getElementById("otp").value;

  // Simulate OTP verification
  if (otp === "123456") {
    alert("Login successful");
    // Proceed to the next step or redirect the user
  } else {
    alert("Invalid OTP");
  }
}
