document.addEventListener('DOMContentLoaded', function() {
  // Inicializa partículas
  if (document.getElementById('cta-particles')) {
    try {
      particlesJS('cta-particles', {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: "#ffffff" },
          shape: { type: "circle" },
          opacity: { 
            value: 0.2, 
            random: true,
            animation: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
          },
          size: { 
            value: 3, 
            random: true,
            animation: { enable: true, speed: 2, size_min: 0.1, sync: false }
          },
          line_linked: {
            enable: true, distance: 150, color: "#ffffff", opacity: 0.2, width: 1
          },
          move: {
            enable: true, speed: 1, direction: "none", random: true,
            straight: false, out_mode: "out", bounce: false
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "grab" },
            onclick: { enable: true, mode: "push" },
            resize: true
          },
          modes: {
            grab: { distance: 140, line_linked: { opacity: 0.5 } },
            push: { particles_nb: 4 }
          }
        },
        retina_detect: true
      });
    } catch(e) {
      console.error("Erro ao inicializar partículas:", e);
    }
  }
  
  // CONTADOR REGRESSIVO APRIMORADO
  function initCountdown() {
    const countdownElements = {
      days: document.getElementById('countdown-days'),
      hours: document.getElementById('countdown-hours'),
      minutes: document.getElementById('countdown-minutes'),
      seconds: document.getElementById('countdown-seconds')
    };
    
    // Verifica se todos os elementos existem
    if (Object.values(countdownElements).some(el => !el)) {
      console.error("Elementos do contador não encontrados");
      return;
    }
    
    // Data final - 7 dias a partir de agora
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);
    
    function updateCountdown() {
      const now = new Date();
      const diff = endDate - now;
      
      if (diff <= 0) {
        // Tempo acabou
        Object.values(countdownElements).forEach(el => {
          el.textContent = '00';
          // Adiciona classe para efeito visual quando acabar
          el.parentElement.classList.add('countdown-ended');
        });
        return;
      }
      
      // Calcula dias, horas, minutos e segundos
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      // Atualiza elementos com animação
      updateCountdownElement(countdownElements.days, days);
      updateCountdownElement(countdownElements.hours, hours);
      updateCountdownElement(countdownElements.minutes, minutes);
      updateCountdownElement(countdownElements.seconds, seconds);
    }
    
    function updateCountdownElement(element, value) {
      const newValue = String(value).padStart(2, '0');
      if (element.textContent !== newValue) {
        element.classList.add('countdown-update');
        element.textContent = newValue;
        
        // Remove a classe após a animação
        setTimeout(() => {
          element.classList.remove('countdown-update');
        }, 500);
      }
    }
    
    // Executar imediatamente e depois a cada segundo
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Log de confirmação
    console.log("Contador iniciado com sucesso! Termina em:", endDate.toLocaleString());
  }
  
  // Inicializa o contador
  initCountdown();
});