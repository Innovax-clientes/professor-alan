document.addEventListener('DOMContentLoaded', function() {
    console.log("Testimonials JS initialized"); // Debug
    
    // Selecionar elementos
    const testimonialGrid = document.querySelector('.testimonials-grid');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.testimonials-control.prev');
    const nextBtn = document.querySelector('.testimonials-control.next');
    const dots = document.querySelectorAll('.nav-dot');
    const currentCounter = document.querySelector('.testimonials-counter .current');
    const totalCounter = document.querySelector('.testimonials-counter .total');
    
    // Verificar se os elementos existem
    if (!testimonialGrid) {
        console.error("Testimonial grid not found");
        return;
    }
    
    if (!testimonialCards.length) {
        console.error("No testimonial cards found");
        return;
    }
    
    console.log(`Found ${testimonialCards.length} testimonial cards`); // Debug
    
    let currentIndex = 0;
    const totalItems = testimonialCards.length;
    
    // Atualizar contador total
    if (totalCounter) totalCounter.textContent = totalItems;
    
    // Função para atualizar cards ativos
    function updateActiveCard(index) {
        testimonialCards.forEach(card => card.classList.remove('active'));
        if (testimonialCards[index]) {
            testimonialCards[index].classList.add('active');
        }
        
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        if (currentCounter) {
            currentCounter.textContent = index + 1;
        }
    }
    
    // Função para navegar para um card específico
    function goToCard(index) {
        if (index < 0) index = 0;
        if (index >= totalItems) index = totalItems - 1;
        
        currentIndex = index;
        console.log(`Going to card ${index}`); // Debug
        
        const card = testimonialCards[index];
        if (!card) {
            console.error(`Card at index ${index} not found`);
            return;
        }
        
        // Scrollar para o card
        const cardPosition = card.offsetLeft;
        const cardWidth = card.offsetWidth;
        const gridWidth = testimonialGrid.offsetWidth;
        
        const scrollTo = cardPosition - (gridWidth / 2) + (cardWidth / 2);
        console.log(`Scrolling to position ${scrollTo}`); // Debug
        
        testimonialGrid.scrollTo({
            left: scrollTo,
            behavior: 'smooth'
        });
        
        updateActiveCard(index);
    }
    
    // Event listeners para os botões
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            console.log("Prev button clicked"); // Debug
            goToCard(currentIndex - 1);
        });
    } else {
        console.error("Prev button not found");
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            console.log("Next button clicked"); // Debug
            goToCard(currentIndex + 1);
        });
    } else {
        console.error("Next button not found");
    }
    
    // Event listeners para os dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            console.log(`Dot ${index} clicked`); // Debug
            goToCard(index);
        });
    });
    
    // Flip card on click
    testimonialCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Não acionar o flip se clicar em um link ou botão dentro do card
            if (e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON') {
                this.classList.toggle('flipped');
            }
        });
    });
    
    // Inicializar com o primeiro card ativo
    console.log("Initializing first card"); // Debug
    goToCard(0);
});