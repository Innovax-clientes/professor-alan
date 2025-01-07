// Inicialização do AOS
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true
});

// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Fechar menu ao clicar em um link
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// FAQ Interatividade
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('h3');
    question.addEventListener('click', () => {
        // Fecha todos os outros itens
        faqItems.forEach(i => {
            if (i !== item) {
                i.classList.remove('active');
            }
        });
        // Alterna o estado atual
        item.classList.toggle('active');
    });
});
