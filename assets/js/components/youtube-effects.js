document.addEventListener('DOMContentLoaded', function() {
  // Elementos de referência
  const youtubeSection = document.getElementById('youtube');
  if (!youtubeSection) return;
  
  // Paralaxe suave ao rolar
  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const youtubeOffset = youtubeSection.offsetTop;
    const windowHeight = window.innerHeight;
    
    // Verifica se a seção está visível
    if (scrollPosition + windowHeight > youtubeOffset && scrollPosition < youtubeOffset + youtubeSection.offsetHeight) {
      const parallaxValue = (scrollPosition - youtubeOffset + windowHeight) * 0.1;
      
      // Aplica o efeito de paralaxe aos elementos decorativos
      const decorations = youtubeSection.querySelectorAll('.yt-decoration');
      decorations.forEach(decoration => {
        decoration.style.transform = `translateY(${parallaxValue}px)`;
      });
      
      // Efeito de profundidade no vídeo de fundo
      const videoBackground = youtubeSection.querySelector('.video-background iframe');
      if (videoBackground) {
        videoBackground.style.transform = `translate(-50%, -50%) scale(${1.1 + parallaxValue / 500})`;
      }
    }
  });
  
  // Efeito de iluminação dinâmica em mouseMove
  youtubeSection.addEventListener('mousemove', function(e) {
    const sectionWidth = youtubeSection.offsetWidth;
    const sectionHeight = youtubeSection.offsetHeight;
    
    // Posição relativa do mouse na seção
    const xPos = (e.clientX / sectionWidth - 0.5) * 40;
    const yPos = (e.clientY / sectionHeight - 0.5) * 40;
    
    // Ajuste das luzes baseado na posição do mouse
    const overlay = youtubeSection.querySelector('.overlay');
    if (overlay) {
      overlay.style.background = `
        linear-gradient(
          ${130 + yPos}deg, 
          rgba(15, 23, 42, 0.85), 
          rgba(8, 15, 30, 0.8),
          rgba(15, 23, 42, 0.75)
        )
      `;
      
      // Move o efeito de luz
      const pseudoBeforeStyle = `
        content: '';
        position: absolute;
        top: ${-20 + yPos}%;
        right: ${-10 + xPos}%;
        width: 60%;
        height: 80%;
        background: radial-gradient(
          ellipse at center,
          rgba(225, 29, 72, 0.2),
          transparent 70%
        );
        opacity: 0.6;
        filter: blur(60px);
        transform: rotate(-15deg);
      `;
      
      // Cria um estilo na página para aplicar o efeito
      let styleElement = document.getElementById('youtube-dynamic-style');
      if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = 'youtube-dynamic-style';
        document.head.appendChild(styleElement);
      }
      
      styleElement.textContent = `
        #youtube .overlay::before {
          ${pseudoBeforeStyle}
        }
      `;
    }
  });
});