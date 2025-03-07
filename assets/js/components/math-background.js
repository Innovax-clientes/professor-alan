document.addEventListener('DOMContentLoaded', function() {
  // Inicializar canvas matemático
  const canvas = document.getElementById('mathCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const particles = [];
  const particleCount = 100;
  
  // Ajustar dimensões do canvas
  function resizeCanvas() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
  }
  
  // Criar partículas matemáticas
  function createParticles() {
    particles.length = 0;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 4 + 1,
        color: `rgba(255, 255, 255, ${Math.random() * 0.2 + 0.1})`,
        vx: Math.random() * 0.5 - 0.25,
        vy: Math.random() * 0.5 - 0.25,
        type: Math.floor(Math.random() * 6) // 0: +, 1: -, 2: ÷, 3: ×, 4: =, 5: √
      });
    }
  }
  
  // Desenhar símbolo matemático
  function drawSymbol(x, y, type, size, color) {
    ctx.font = `${size * 10}px 'Courier New'`;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    let symbol = '+';
    switch(type) {
      case 0: symbol = '+'; break;
      case 1: symbol = '-'; break;
      case 2: symbol = '÷'; break;
      case 3: symbol = '×'; break;
      case 4: symbol = '='; break;
      case 5: symbol = '√'; break;
    }
    
    ctx.fillText(symbol, x, y);
  }
  
  // Animar partículas
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Desenhar conexões entre partículas próximas
    ctx.beginPath();
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 120) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    
    // Atualizar e desenhar partículas
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      
      // Manter partículas dentro do canvas
      if (p.x < 0 || p.x > canvas.width) p.vx = -p.vx;
      if (p.y < 0 || p.y > canvas.height) p.vy = -p.vy;
      
      drawSymbol(p.x, p.y, p.type, p.size, p.color);
    });
    
    requestAnimationFrame(animate);
  }
  
  // Inicializar
  window.addEventListener('resize', function() {
    resizeCanvas();
    createParticles();
  });
  
  resizeCanvas();
  createParticles();
  animate();
  
  // Mouse interaction
  let mouseX = 0;
  let mouseY = 0;
  
  canvas.addEventListener('mousemove', function(e) {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    
    particles.forEach(p => {
      const dx = p.x - mouseX;
      const dy = p.y - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        const angle = Math.atan2(dy, dx);
        const force = (100 - distance) / 500;
        p.vx += Math.cos(angle) * force;
        p.vy += Math.sin(angle) * force;
      }
    });
  });
});