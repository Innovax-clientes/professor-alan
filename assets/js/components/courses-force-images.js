document.addEventListener('DOMContentLoaded', function() {
  // Animação sequencial dos cards
  const courseCards = document.querySelectorAll('.course-card-premium');
  courseCards.forEach((card, index) => {
    card.style.animationDelay = `${0.1 * (index + 1)}s`;
    card.style.opacity = "1"; // Força a visibilidade imediata
  });
  
  // Efeito de movimento 3D sutil para os cards
  courseCards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const cardRect = card.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const cardCenterY = cardRect.top + cardRect.height / 2;
      const mouseX = e.clientX - cardCenterX;
      const mouseY = e.clientY - cardCenterY;
      
      // Calcular ângulo de rotação (limitado a 5 graus)
      const rotateX = Math.min(Math.max(mouseY * -0.01, -5), 5);
      const rotateY = Math.min(Math.max(mouseX * 0.01, -5), 5);
      
      const cardInner = card.querySelector('.card-inner');
      if (cardInner) {
        cardInner.style.transform = `
          perspective(1000px) 
          rotateX(${rotateX}deg) 
          rotateY(${rotateY}deg)
        `;
      }
    });
    
    // Resetar a rotação quando o mouse sai
    card.addEventListener('mouseleave', function() {
      const cardInner = card.querySelector('.card-inner');
      if (cardInner) {
        cardInner.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      }
    });
    
    // Garantir 100% de visibilidade em todos os elementos importantes
    const elementsToForce = [
      card.querySelector('.card-image'),
      card.querySelector('.action-button'),
      card.querySelector('.card-content'),
      card.querySelector('.price-current'),
      card.querySelector('.lifetime-badge')
    ];
    
    elementsToForce.forEach(el => {
      if (el) {
        el.style.visibility = 'visible';
        el.style.opacity = '1';
        el.style.display = el.tagName === 'IMG' ? 'block' : '';
      }
    });
  });
  
  // Classe de fallback para navegadores mais antigos
  document.querySelectorAll('.course-card-premium').forEach(card => {
    card.classList.add('js-fallback');
  });
  
  console.log('Courses Image Force: Loaded and applied');
});