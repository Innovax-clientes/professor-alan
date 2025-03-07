/* filepath: /c:/Users/abdal/OneDrive/Documentos/GitHub/professor-alan/assets/js/components/navbar.js */

// Gerencia comportamento da navbar
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    
    // Função para controlar navbar ao scroll
    function handleNavbarScroll() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Adicionar event listener para scroll
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Fechar menu ao clicar em links (mobile)
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });
    // Add this to your scripts
document.addEventListener('DOMContentLoaded', function() {
    // Set the date for countdown (7 days from now)
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);
    
    function updateCountdown() {
      const now = new Date().getTime();
      const distance = endDate - now;
      
      // Calculate days, hours, minutes and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      // Update the HTML
      document.getElementById('days-count').textContent = String(days).padStart(2, '0');
      document.getElementById('hours-count').textContent = String(hours).padStart(2, '0');
      document.getElementById('minutes-count').textContent = String(minutes).padStart(2, '0');
      document.getElementById('seconds-count').textContent = String(seconds).padStart(2, '0');
    }
    
    // Update countdown every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Handle close button
    const closeButton = document.querySelector('.top-bar-close');
    if (closeButton) {
      closeButton.addEventListener('click', function() {
        document.querySelector('.top-bar-container').style.display = 'none';
        document.querySelector('.navbar').style.marginTop = '0';
      });
    }
  });
});