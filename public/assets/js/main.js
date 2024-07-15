/**
 * ===================================================================
 * main js
 *
 * -------------------------------------------------------------------
 */

(function ($) {
  "use strict";

  $(window).load(function () {
    // will first fade out the loading animation
    $("#loader").fadeOut("slow", function () {
      // will fade out the whole DIV that covers the website.
      $("#preloader").delay(300).fadeOut("slow");
    });
  });

  setTimeout(function () {
    $("#intro h1").fitText(1, { minFontSize: "42px", maxFontSize: "84px" });
  }, 100);

  $(".fluid-video-wrapper").fitVids();

  $("#owl-slider").owlCarousel({
    navigation: false,
    pagination: true,
    itemsCustom: [
      [0, 1],
      [700, 2],
      [960, 3],
    ],
    navigationText: false,
  });

  $(".alert-box").on("click", ".close", function () {
    $(this).parent().fadeOut(500);
  });

  /*----------------------------------------------------- */
  /* Stat Counter
  ------------------------------------------------------- */
  var statSection = $("#stats"),
    stats = $(".stat-count");

  statSection.waypoint({
    handler: function (direction) {
      if (direction === "down") {
        stats.each(function () {
          var $this = $(this);

          $({ Counter: 0 }).animate(
            { Counter: $this.text() },
            {
              duration: 4000,
              easing: "swing",
              step: function (curValue) {
                $this.text(Math.ceil(curValue));
              },
            }
          );
        });
      }

      // trigger once only
      this.destroy();
    },
    offset: "90%",
  });

  /*----------------------------------------------------- */
  /* Navbar Scroll Animation
  ------------------------------------------------------- */
  document.addEventListener("scroll", function () {
    const scrollPosition = window.scrollY;
    const introSection = document.querySelector(".intro-section");
    const introHeight = introSection.clientHeight;

    introSection.style.transform = `translateY(${scrollPosition / 2}px)`;
    introSection.style.opacity = 1 - scrollPosition / introHeight;

    if (scrollPosition > introHeight) {
      introSection.classList.add("hidden");
      document.getElementById("navbar").classList.remove("navbar-vertical");
      document.getElementById("navbar").classList.add("navbar-horizontal");
    } else {
      introSection.classList.remove("hidden");
      document.getElementById("navbar").classList.add("navbar-vertical");
      document.getElementById("navbar").classList.remove("navbar-horizontal");
    }
  });

  $(window).on("load", function () {
    setTimeout(function () {
      $("#preloader").fadeOut("slow", function () {
        $(this).remove();
        $("#content").fadeIn("slow");
        animateText();
      });
    }, 2000);
  });

  function animateText() {
    const texts = document.querySelectorAll(".animate-text");
    texts.forEach((text, index) => {
      setTimeout(() => {
        text.classList.add("fade-in");
      }, index * 300); // Staggered animation
    });
  }

  document.addEventListener("scroll", function () {
    const scrollPosition = window.scrollY;
    const introSection = document.querySelector(".intro-section");
    const introHeight = introSection.clientHeight;

    introSection.style.transform = `translateY(${scrollPosition / 2}px)`;
    introSection.style.opacity = 1 - scrollPosition / introHeight;

    if (scrollPosition > introHeight) {
      introSection.classList.add("hidden");
    } else {
      introSection.classList.remove("hidden");
    }

    const navbar = document.getElementById("navbar");
    if (scrollPosition > 100) {
      navbar.classList.add("horizontal");
    } else {
      navbar.classList.remove("horizontal");
    }
  });
})(jQuery);
$(window).on("load", function () {
  setTimeout(function () {
    $("#preloader").fadeOut("slow", function () {
      $(this).remove();
      $("#content").fadeIn("slow");
      animateText();
    });
  }, 2000);
});

function animateText() {
  const texts = document.querySelectorAll(".animate-text");
  texts.forEach((text, index) => {
    setTimeout(() => {
      text.classList.add("fade-in");
    }, index * 300); // Staggered animation
  });
}

document.addEventListener("scroll", function () {
  const scrollPosition = window.scrollY;
  const introSection = document.querySelector(".intro-section");
  const introHeight = introSection.clientHeight;

  introSection.style.transform = `translateY(${scrollPosition / 2}px)`;
  introSection.style.opacity = 1 - scrollPosition / introHeight;

  if (scrollPosition > introHeight) {
    introSection.classList.add("hidden");
    document.getElementById("navbar").classList.remove("navbar-vertical");
    document.getElementById("navbar").classList.add("navbar-horizontal");
  } else {
    introSection.classList.remove("hidden");
    document.getElementById("navbar").classList.add("navbar-vertical");
    document.getElementById("navbar").classList.remove("navbar-horizontal");
  }
});

$(window).on("load", function () {
  setTimeout(function () {
    $("#preloader").fadeOut("slow", function () {
      $(this).remove();
      $("#content").fadeIn("slow");
      animateText();
    });
  }, 2000);
});

function animateText() {
  const texts = document.querySelectorAll(".animate-text");
  texts.forEach((text, index) => {
    setTimeout(() => {
      text.classList.add("fade-in");
    }, index * 300); // Staggered animation
  });
}

document.addEventListener("scroll", function () {
  const scrollPosition = window.scrollY;
  const introSection = document.querySelector(".intro-section");
  const introHeight = introSection.clientHeight;

  introSection.style.transform = `translateY(${scrollPosition / 2}px)`;
  introSection.style.opacity = 1 - scrollPosition / introHeight;

  if (scrollPosition > introHeight) {
    introSection.classList.add("hidden");
  } else {
    introSection.classList.remove("hidden");
  }

  const navbar = document.getElementById("navbar");
  if (scrollPosition > 100) {
    navbar.classList.add("horizontal");
  } else {
    navbar.classList.remove("horizontal");
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const introSection = document.querySelector(".intro-section");
  const navbar = document.querySelector(".navbar");

  const setIntroHeight = () => {
    introSection.style.height = `${window.innerHeight}px`;
  };

  setIntroHeight(); // Set initial height
  window.addEventListener("resize", setIntroHeight); // Adjust height on window resize

  document.addEventListener("scroll", function () {
    const scrollPosition = window.scrollY;
    const introHeight = window.innerHeight;

    // Adjust the opacity and transform dynamically based on scroll position
    introSection.style.transform = `translateY(${scrollPosition / 2}px)`;
    introSection.style.opacity = 1 - scrollPosition / introHeight;

    if (scrollPosition > introHeight) {
      introSection.classList.add("hidden");
    } else {
      introSection.classList.remove("hidden");
    }

    // Navbar transition
    if (scrollPosition > 50) {
      navbar.classList.add("navbar-vertical");
      introSection.classList.add("text-animate-out");
    } else {
      navbar.classList.remove("navbar-vertical");
      introSection.classList.remove("text-animate-out");
    }
  });

  // Smooth scroll for the button
  const smoothScrollLinks = document.querySelectorAll(".smoothscroll");

  const smoothScroll = (target, duration) => {
    const targetElement = document.querySelector(target);
    const targetPosition = targetElement.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    let startTime = null;

    const animateScroll = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, targetPosition, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animateScroll);
    };

    const ease = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    requestAnimationFrame(animateScroll);
  };

  smoothScrollLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const target = this.getAttribute("href");
      smoothScroll(target, 1000); // Scroll duration in milliseconds
    });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  // Initialize Splitting.js
  Splitting();

  // FAQ Toggle Functionality
  const faqList = document.getElementById("faq-list");
  faqList.addEventListener("click", function (event) {
    if (event.target.tagName === "H4") {
      const item = event.target.parentElement;
      item.classList.toggle("active");
    }
  });

  // Handle Comment Form Submission
  const commentsForm = document.getElementById("comments-form");
  const commentList = document.getElementById("comment-list");

  commentsForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("comment-name").value;
    const content = document.getElementById("comment-content").value;

    if (name && content) {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${name}</strong>: ${content}`;
      commentList.appendChild(li);

      document.getElementById("comment-name").value = "";
      document.getElementById("comment-content").value = "";
      gsap.from(li, { opacity: 0, y: -20, duration: 0.5 });
    }
  });

  // GSAP Animation for FAQ Items
  const faqItems = document.querySelectorAll("#faq-list li");
  faqItems.forEach((item, index) => {
    gsap.from(item, { opacity: 0, x: -20, delay: index * 0.1, duration: 0.5 });
  });

  // GSAP Animation for Section Intro
  const sectionIntro = document.querySelector(".section-intro");
  gsap.from(sectionIntro, { opacity: 0, y: -20, duration: 1 });
});
document.addEventListener("DOMContentLoaded", function () {
  // Initialize Splitting.js
  Splitting();

  // FAQ Toggle Functionality
  const faqList = document.getElementById("faq-list");
  faqList.addEventListener("click", function (event) {
    if (event.target.tagName === "H4") {
      const item = event.target.parentElement;
      item.classList.toggle("active");
    }
  });

  // Handle Comment Form Submission
  const commentsForm = document.getElementById("comments-form");
  const commentList = document.getElementById("comment-list");

  commentsForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("comment-name").value;
    const content = document.getElementById("comment-content").value;

    if (name && content) {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${name}</strong>: ${content}`;
      commentList.appendChild(li);

      document.getElementById("comment-name").value = "";
      document.getElementById("comment-content").value = "";
      gsap.from(li, { opacity: 0, y: -20, duration: 0.5 });
    }
  });

  // GSAP Animation for FAQ Items
  const faqItems = document.querySelectorAll("#faq-list li");
  faqItems.forEach((item, index) => {
    gsap.from(item, { opacity: 0, x: -20, delay: index * 0.1, duration: 0.5 });
  });

  // GSAP Animation for Section Intro
  const sectionIntro = document.querySelector(".section-intro");
  gsap.from(sectionIntro, { opacity: 0, y: -20, duration: 1 });

  // Initialize Swiper for Features
  let swiper = new Swiper(".mySwiper", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // Initialize Swiper for Testimonials
  let testimonialSwiper = new Swiper(".mySwiperTestimonials", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // GSAP Animation for Call to Action Section
  const ctaSection = document.querySelector(".cta-section");
  gsap.from(ctaSection, {
    opacity: 0,
    scale: 0.8,
    duration: 1,
    ease: "back.out(1.7)",
  });
});
