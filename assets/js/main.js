/* filepath: /c:/Users/abdal/OneDrive/Documentos/GitHub/professor-alan/assets/js/main.js */
document.addEventListener('DOMContentLoaded', function () {
    // Iniciar AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });

    // Navbar Scroll Effect
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Mostrar/Esconder Botão Back to Top
        const backToTopButton = document.getElementById('backToTop');
        if (backToTopButton) {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        }
    });

    // Scroll Suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = target.getBoundingClientRect().top + window.pageYOffset - 120;
                window.scrollTo({
                    top: offset,
                    behavior: 'smooth'
                });

                // Fechar o menu mobile após clicar
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            }
        });
    });

    // Função de contagem para estatísticas
    const countUp = (counter) => {
        const target = parseInt(counter.getAttribute('data-count'), 10);
        const prefix = counter.getAttribute('data-prefix') || '';
        const format = counter.getAttribute('data-format');
        let suffix = '';

        let finalValue = target;
        if (format === 'mil') {
            finalValue = target / 1000;
            suffix = 'Mil';
        }

        let current = 0;
        const duration = 2000;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            current = Math.floor(progress * finalValue);

            if (format === 'mil') {
                counter.innerText = `${prefix}${current}${suffix}`;
            } else {
                counter.innerText = `${prefix}${current}`;
            }

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    };

    // Inicializar contadores com Intersection Observer
    const statsCounters = document.querySelectorAll('.stat-number[data-count]');
    let countersStarted = false;
    const aboutSection = document.getElementById('about');

    if (aboutSection && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersStarted) {
                    statsCounters.forEach(counter => countUp(counter));
                    countersStarted = true;
                    observer.unobserve(aboutSection);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(aboutSection);
    } else if (statsCounters.length) {
        statsCounters.forEach(counter => countUp(counter));
    }

    // Inicializar Particles.js
    if (document.getElementById('particles-js')) {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#ffffff" },
                "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" } },
                "opacity": { "value": 0.5, "random": false },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 },
                "move": { "enable": true, "speed": 4, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "repulse" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "repulse": { "distance": 100, "duration": 0.4 },
                    "push": { "particles_nb": 4 }
                }
            },
            "retina_detect": true
        });
    }

    // Configurar botão Back to Top
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Configurar toggle do menu mobile
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
        navbarToggler.addEventListener('click', () => {
            document.body.classList.toggle('nav-open');
        });
    }
    
    // Inicializar GSAP animations
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
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
    }

    // Encontrar todos os botões de flip
    const flipButtons = document.querySelectorAll('.flip-button');
    const backFlipButtons = document.querySelectorAll('.back-flip-button');
    
    // Adicionar event listener para cada botão de flip
    flipButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // Impede que o evento se propague para os elementos pais
            const card = this.closest('.card-inner');
            card.classList.add('flipped');
        });
    });
    
    // Adicionar event listener para botões de voltar
    backFlipButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const card = this.closest('.card-inner');
            card.classList.remove('flipped');
        });
    });
    
    // Garantir que os botões Saiba Mais não virem o card
    const cardButtons = document.querySelectorAll('.card-button');
    cardButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Impede que o evento se propague para o card
            // Aqui você pode adicionar a lógica de navegação ou qualquer outra ação
            console.log('Botão Saiba Mais clicado');
        });
    });
    
    // Remover o event listener de clique do card inteiro
    const cards = document.querySelectorAll('.course-card-premium');
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
});