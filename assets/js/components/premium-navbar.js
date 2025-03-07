document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const currentPath = window.location.pathname;
  
  // Detecte a página atual e adicione a classe 'active' ao link correspondente
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '/' && href === '#home')) {
      link.classList.add('active');
    }
    
    // Adicione efeito de ondulação nos links
    link.addEventListener('mouseenter', createRipple);
  });
  
  // Efeito de ondulação sofisticado
  function createRipple(e) {
    const link = e.currentTarget;
    
    // Remova ondulações anteriores
    const ripples = link.querySelectorAll('.nav-ripple');
    ripples.forEach(ripple => ripple.remove());
    
    const ripple = document.createElement('span');
    ripple.classList.add('nav-ripple');
    
    const diameter = Math.max(link.clientWidth, link.clientHeight);
    const radius = diameter / 2;
    
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `0px`;
    ripple.style.top = `0px`;
    
    link.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
  
  // Efeito de paralaxe sutil no navegador
  if (navbar) {
    document.addEventListener('mousemove', function(e) {
      if (window.innerWidth > 992) {  // Apenas em dispositivos desktop
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        // Movimento sutil para logotipo
        const logo = navbar.querySelector('.navbar-brand img');
        if (logo) {
          logo.style.transform = `perspective(800px) translateZ(5px) rotateY(${mouseX * 5}deg)`;
        }
        
        // Sombra dinâmica para o navbar
        navbar.style.boxShadow = `
          ${-mouseX * 10}px ${mouseY * 10}px 30px rgba(0, 0, 0, 0.2),
          0 10px 30px rgba(0, 0, 0, 0.2),
          0 4px 10px rgba(0, 0, 0, 0.15),
          0 1px 0 rgba(255, 255, 255, 0.05) inset
        `;
      }
    });
  }
  
  // Efeito de rolagem aprimorado
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
      navbar.classList.add('scrolled');
      
      // Efeito avançado ao rolar
      gsap.to(navbar, {
        backgroundColor: 'rgba(7, 12, 25, 0.85)',
        backdropFilter: 'blur(25px) saturate(200%)',
        borderBottom: '1px solid rgba(99, 102, 241, 0.2)',
        duration: 0.4,
        ease: 'power2.out'
      });
    } else {
      navbar.classList.remove('scrolled');
      
      // Restaurar estado original com animação
      gsap.to(navbar, {
        backgroundColor: 'rgba(15, 23, 42, 0.65)', 
        backdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        duration: 0.4,
        ease: 'power2.out'
      });
    }
  });
  
  // Adicionar estilo de menu dropdown premium se houver submenus
  const dropdowns = document.querySelectorAll('.dropdown');
  
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const menu = dropdown.querySelector('.dropdown-menu');
    
    if (toggle && menu) {
      // Aprimorar visualmente o menu dropdown
      menu.classList.add('premium-dropdown');
      
      // Adicionar animação ao abrir o dropdown
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (menu.classList.contains('show')) {
          menu.style.animation = 'fadeOutUp 0.3s forwards';
          setTimeout(() => {
            menu.classList.remove('show');
            menu.style.animation = '';
          }, 300);
        } else {
          menu.classList.add('show');
          menu.style.animation = 'fadeInDown 0.4s forwards';
        }
      });
    }
  });
});

// Adicione isso ao seu CSS (pode ser incluído no arquivo navbar.css)
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .nav-ripple {
      position: absolute;
      background: rgba(255, 255, 255, 0.15);
      border-radius: 50%;
      transform: scale(0);
      animation: rippleEffect 0.6s linear;
      pointer-events: none;
    }
    
    @keyframes rippleEffect {
      to {
        transform: scale(2);
        opacity: 0;
      }
    }
    
    .premium-dropdown {
      background: rgba(13, 19, 33, 0.95);
      backdrop-filter: blur(25px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.35);
      padding: 15px;
      min-width: 200px;
    }
    
    @keyframes fadeInDown {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes fadeOutUp {
      from {
        opacity: 1;
        transform: translateY(0);
      }
      to {
        opacity: 0;
        transform: translateY(-20px);
      }
    }
  </style>
`);