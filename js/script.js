let
    // * Navbar
    navbar = document.querySelector("nav.navbar"),
    nextBtn = document.querySelector("#Home .next"),
    prevBtn = document.querySelector("#Home .prev"),
    $navLinks = $("nav.navbar .nav-link");

lastScrollY = window.scrollY;

getData("./data/products.json");

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

// * Swiper
const swiper = new Swiper(".swiper", {

    loop: true,
    speed: 600,

    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },

    centeredSlides: true,

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
        rotate: 25,
        stretch: 0,
        depth: 120,
        modifier: 1,
        slideShadows: false,
    },

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        type: "bullets",
        dynamicBullets: true,
        dynamicMainBullets: 5,
    },

    grabCursor: true,

    keyboard: {
        enabled: true,
        onlyInViewport: true,
    },

});

// * WOW
wow = new WOW(
    {
        animateClass: 'animate__animated',
    }
)
wow.init();

// * Loading Page Function
loading();

// * NavLinks

$navLinks.each(function (index, link) {
    $(link).on("click", function (e) {
        e.preventDefault();
        let sectionId = $(`.section${link.getAttribute("href")}`)[0],
            topOfSection = ($(sectionId).offset().top) - ($(navbar).outerHeight()),
            currentLink = $("nav.navbar .nav-link.active");

        currentLink.removeClass("active");
        $(link).addClass("active");

        window.scrollTo({
            top: topOfSection,
            behavior: "smooth"
        });

    });
});

window.addEventListener("scroll", function () {
    $(".section").each(function (index, section) {
        let topOfSection = (($(section).offset().top) - ($(navbar).outerHeight())) - 50,
            bottomOfSection = (topOfSection + ($(section).outerHeight())),
            currentLink = $("nav.navbar .nav-link.active");

        if (window.scrollY > topOfSection && window.scrollY < bottomOfSection) {
            currentLink.removeClass("active");
            $(`nav.navbar .nav-link[href="#${section.id}"]`).addClass("active");

        }
    });
});

$("#Home > p.icon").click(function () {
    window.scrollTo({
        top: (($("#Story").offset().top) - ($(navbar).outerHeight())),
        behavior: "smooth"
    });
})

showFeedBack();
