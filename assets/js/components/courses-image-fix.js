document.addEventListener('DOMContentLoaded', function() {
  // Seleciona todas as imagens do card
  const cardImages = document.querySelectorAll('.card-image, .card-image-wrapper img');
  
  // Força a exibição correta das imagens
  cardImages.forEach(img => {
    // Define propriedades importantes para garantir visibilidade
    img.style.setProperty('display', 'block', 'important');
    img.style.setProperty('visibility', 'visible', 'important');
    img.style.setProperty('opacity', '1', 'important');
    
    // Pré-carrega a imagem para evitar problemas de carregamento
    const preloader = new Image();
    preloader.src = img.src;
    
    // Adiciona tratamento para imagens que não carregarem
    img.onerror = function() {
      this.style.display = 'none';
      this.parentElement.classList.add('image-error');
    };
    
    // Quando a imagem carrega com sucesso
    img.onload = function() {
      this.classList.add('loaded');
      this.parentElement.classList.add('image-loaded');
    };
    
    // Forçar exibição após um tempo, como fallback
    setTimeout(() => {
      img.style.setProperty('display', 'block', 'important');
      img.style.setProperty('visibility', 'visible', 'important');
      img.style.setProperty('opacity', '1', 'important');
    }, 500);
  });
  
  // Adicionar classes aos cards para melhorar layout
  const courseCards = document.querySelectorAll('.course-card-premium');
  courseCards.forEach(card => {
    card.classList.add('premium-shadow');
    
    // Melhora a experiência de hover
    card.addEventListener('mouseenter', function() {
      this.classList.add('card-hover');
    });
    
    card.addEventListener('mouseleave', function() {
      this.classList.remove('card-hover');
    });
  });
});