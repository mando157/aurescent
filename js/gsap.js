// * gsap
document.addEventListener("DOMContentLoaded", () => {

    gsap.registerPlugin(SplitText, ScrollTrigger);

    const wrapper = document.querySelector(".Horizontal");
    const text = document.querySelector(".Horizontal__text");

    if (!wrapper || !text) return;

    const split = SplitText.create(text, {
        type: "chars, words"
    });

    const scrollTween = gsap.to(text, {
        x: () => -(text.scrollWidth - wrapper.offsetWidth),
        ease: "none",

        scrollTrigger: {
            trigger: wrapper,
            pin: true,
            scrub: true,
            end: () => `+=${text.scrollWidth}`
        }
    });

    split.chars.forEach((char) => {

        gsap.from(char, {
            yPercent: "random(-200, 200)",
            rotation: "random(-20, 20)",
            ease: "back.out(1.2)",

            scrollTrigger: {
                trigger: char,
                containerAnimation: scrollTween,
                start: "left 100%",
                end: "left 30%",
                scrub: 1
            }
        });

    });

});


// * Loading Page
gsap.registerPlugin(SplitText);

// Grab all lines
const lines = document.querySelectorAll(".line");

// Split characters for all lines
const splitLines = Array.from(lines).map(line =>
    new SplitText(line, { type: "chars", charsClass: "char" })
);

// 3D setup
const width = window.innerWidth;
const height = window.innerHeight;
const depth = -width / 60;
const transformOrigin = `50% 50% ${depth}`;

gsap.set(lines, { perspective: 700, transformStyle: "preserve-3d" });

// Timeline animation
const animTime = 0.9;
const tl = gsap.timeline({ repeat: -1 });

// Animate each line in a loop
splitLines.forEach((split, index) => {
    tl.fromTo(
        split.chars,
        { rotationX: -90 },
        { rotationX: 90, stagger: 0.08, duration: animTime, ease: "none", transformOrigin },
        index * 0.45 // stagger between lines
    );
});
