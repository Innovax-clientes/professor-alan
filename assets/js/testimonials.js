document.addEventListener('DOMContentLoaded', function() {
    // Seleção de elementos
    const testimonialGrid = document.querySelector('.testimonials-grid');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.testimonials-control.prev');
    const nextBtn = document.querySelector('.testimonials-control.next');
    const dots = document.querySelectorAll('.nav-dot');
    const currentCounter = document.querySelector('.testimonials-counter .current');
    const totalCounter = document.querySelector('.testimonials-counter .total');
    
    // Verificar se os elementos existem
    if (!testimonialGrid || !testimonialCards.length) return;
    
    let currentIndex = 0;
    const totalItems = testimonialCards.length;
    let isScrolling;
    
    // Inicializar contador
    if (totalCounter) totalCounter.textContent = totalItems;
    if (currentCounter) currentCounter.textContent = currentIndex + 1;
    
    // Função para atualizar a classe ativa
    function updateActiveCard(index) {
        // Remover classe ativa de todos os cards
        testimonialCards.forEach(card => card.classList.remove('active'));
        
        // Adicionar classe ativa ao card atual
        testimonialCards[index].classList.add('active');
        
        // Atualizar dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        // Atualizar contador
        if (currentCounter) currentCounter.textContent = index + 1;
    }
    
    // Função para navegar para um card específico - CORREÇÃO CRÍTICA
    function goToCard(index) {
        if (index < 0) index = 0;
        if (index >= totalItems) index = totalItems - 1;
        
        currentIndex = index;
        updateActiveCard(currentIndex);
        
        // Scrollar para o card - CORREÇÃO ESSENCIAL
        const card = testimonialCards[currentIndex];
        if (!card) return;
        
        const scrollLeft = card.offsetLeft - (testimonialGrid.clientWidth / 2) + (card.clientWidth / 2);
        
        testimonialGrid.scrollTo({
            left: scrollLeft,
            behavior: 'smooth'
        });
    }
    
    // Event listeners para botões de navegação
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            goToCard(currentIndex - 1);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            goToCard(currentIndex + 1);
        });
    }
    
    // Event listeners para dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            goToCard(index);
        });
    });
    
    // Detectar scroll manual
    testimonialGrid.addEventListener('scroll', function() {
        clearTimeout(isScrolling);
        
        isScrolling = setTimeout(function() {
            const gridCenter = testimonialGrid.offsetWidth / 2;
            let closestCard = 0;
            let minDistance = Infinity;
            
            testimonialCards.forEach((card, index) => {
                const cardCenter = card.offsetLeft + card.offsetWidth / 2;
                const distance = Math.abs(cardCenter - (testimonialGrid.scrollLeft + gridCenter));
                
                if (distance < minDistance) {
                    minDistance = distance;
                    closestCard = index;
                }
            });
            
            currentIndex = closestCard;
            updateActiveCard(currentIndex);
        }, 150);
    }, { passive: true });
    
    // Flip card on click
    testimonialCards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
    });
    
    // Inicializar com o primeiro card ativo
    goToCard(0);
    
    // Adicionar partículas
    const testimonialsSection = document.getElementById('testimonials');
    if (testimonialsSection) {
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'testimonial-particle';
            
            const size = Math.random() * 5 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            particle.style.animationDuration = `${Math.random() * 10 + 8}s`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            
            testimonialsSection.appendChild(particle);
        }
    }
});