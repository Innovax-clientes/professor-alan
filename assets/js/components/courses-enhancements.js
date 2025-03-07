// Adicione este código ao seu arquivo JavaScript existente
document.addEventListener('DOMContentLoaded', function() {
  // Efeito de magnetismo para botões 
  const actionButtons = document.querySelectorAll('.action-button');
  
  actionButtons.forEach(button => {
    button.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Escala do efeito (menor para movimento mais sutil)
      const scale = 0.1;
      
      // Aplica uma leve rotação e movimento baseado na posição do mouse
      this.style.transform = `translateY(-7px) perspective(500px) rotateX(${-y * scale}deg) rotateY(${x * scale}deg)`;
      
      // Move o ícone da seta em direção ao cursor
      const icon = this.querySelector('i');
      if (icon) {
        icon.style.transform = `translateX(${x * 0.05}px) translateY(${y * 0.05}px)`;
      }
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = '';
      
      const icon = this.querySelector('i');
      if (icon) {
        icon.style.transform = '';
      }
    });
    
    // Efeito de clique com ripple
    button.addEventListener('click', function(e) {
      // Criar elemento de ripple
      const ripple = document.createElement('span');
      ripple.classList.add('ripple-effect');
      
      // Posicionar o ripple onde o usuário clicou
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      // Adicionar o ripple ao botão
      this.appendChild(ripple);
      
      // Remover o ripple após a animação
      setTimeout(() => {
        ripple.remove();
      }, 800);
    });
  });
  
  // Garantir que as imagens sejam visíveis
  const courseImages = document.querySelectorAll('.card-image');
  courseImages.forEach(img => {
    img.style.display = 'block';
    img.style.visibility = 'visible';
    img.style.opacity = '1';
  });
});