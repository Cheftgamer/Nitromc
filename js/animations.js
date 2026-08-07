gsap.registerPlugin(ScrollTrigger);

gsap.from(".ini", {
    opacity: 0,
    y: -40,
    duration: 1,
    ease: "power3.out"
});

anime({
    targets: '.ini',
    translateY: [-5, 5],
    duration: 3000,
    loop: true,
    direction: 'alternate',
    easing: 'easeInOutSine'
});

const cancionesLis = document.querySelectorAll('.cancion-lis');

cancionesLis.forEach((element) => {
    gsap.fromTo(element, 
        {
            opacity: 0,
            y: 30,
            scale: 0.96
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
                trigger: element,
                start: "top 90%",
                end: "top 70%",
                scrub: 0.5
            }
        }
    );
});