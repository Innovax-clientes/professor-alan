/* filepath: /c:/Users/abdal/OneDrive/Documentos/GitHub/professor-alan/assets/js/components/animations.js */

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic'
        });
    }
    
    // Inicializar GSAP animações
    if (typeof gsap !== 'undefined') {
        // Header animations
        gsap.from(".text-content h1", {
            y: 50,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out"
        });
        
        gsap.from(".text-content p", {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            delay: 0.5
        });
        
        gsap.from(".text-content .btn-cta", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.7
        });
        
        // Parallax effect 
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
            
            // Cards com efeito parallax
            gsap.utils.toArray('.course-card').forEach(card => {
                gsap.to(card, {
                    y: -20,
                    scrollTrigger: {
                        trigger: card,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                });
            });
        }
    }
    
    // Inicializar Particles.js
    if (document.getElementById('particles-js') && typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#ffffff" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5, "random": true },
                "size": { "value": 3, "random": true },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 3,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "repulse" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                }
            },
            "retina_detect": true
        });
    }
});