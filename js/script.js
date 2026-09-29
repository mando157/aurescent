

let
    navbar = document.querySelector("nav.navbar"),
    nextBtn = document.querySelector("#Home .next"),
    prevBtn = document.querySelector("#Home .prev"),

    lastScrollY = window.scrollY;

// * Next & Prev Buttons
nextBtn.addEventListener("click", function () {
    let currentPage = document.querySelector(".row.active"),
        firstPage = document.querySelector("#Home .row:first-of-type"),
        nextPage = currentPage.nextElementSibling ?? firstPage;

    currentPage.classList.remove("show");

    setTimeout(function () {
        currentPage.classList.remove("active");
    }, 500);


    setTimeout(function () {
        nextPage.classList.add("active");
        setTimeout(function () {
            nextPage.classList.add("show");
        }, 100);
    }, 500);
});
prevBtn.addEventListener("click", function () {
    let currentPage = document.querySelector(".row.active"),
        lastPage = document.querySelector("#Home .row:last-of-type"),
        prevPage = currentPage.previousElementSibling ?? lastPage;

    currentPage.classList.remove("show");

    setTimeout(function () {
        currentPage.classList.remove("active");
    }, 500);


    setTimeout(function () {
        prevPage.classList.add("active");
        setTimeout(function () {
            prevPage.classList.add("show");
        }, 100);
    }, 500);
});

window.addEventListener("scroll", function () {
    if (window.scrollY > lastScrollY) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

    lastScrollY = window.scrollY;
});

// * Swiper
const swiper = new Swiper(".swiper", {

    loop: true,
    speed: 500,

    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },

    slidesPerView: 1,
    spaceBetween: 20,

    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 20,
        },

        576: {
            slidesPerView: 1,
            spaceBetween: 20,
        },

        768: {
            slidesPerView: 3,
            spaceBetween: 30,
        },

        992: {
            slidesPerView: 3,
            spaceBetween: 40,
        },
    },

    effect: "coverflow",

    coverflowEffect: {
        rotate: 35,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
    },

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        type: 'bullets',
    },

    grabCursor: true,

    keyboard: {
        enabled: true,
        onlyInViewport: false,
    },

});