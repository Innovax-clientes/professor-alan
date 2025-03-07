document.addEventListener('DOMContentLoaded', function() {
    // 3D image rotation effect with mouse/touch
    const professorContainer = document.querySelector('.professor-img-container');
    const professorImg = document.querySelector('.professor-img-wrapper');
    
    if (professorContainer && professorImg) {
        // Mouse move effect
        professorContainer.addEventListener('mousemove', function(e) {
            const rect = professorContainer.getBoundingClientRect();
            const mouseX = (e.clientX - rect.left) / rect.width;
            const mouseY = (e.clientY - rect.top) / rect.height;
            
            const rotateY = 10 * (mouseX - 0.5);
            const rotateX = -10 * (mouseY - 0.5);
            
            professorImg.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        // Reset on mouse leave
        professorContainer.addEventListener('mouseleave', function() {
            professorImg.style.transform = 'rotateX(5deg) rotateY(-5deg)';
        });
        
        // Touch support
        professorContainer.addEventListener('touchmove', function(e) {
            e.preventDefault();
            const touch = e.touches[0];
            const rect = professorContainer.getBoundingClientRect();
            const touchX = (touch.clientX - rect.left) / rect.width;
            const touchY = (touch.clientY - rect.top) / rect.height;
            
            const rotateY = 10 * (touchX - 0.5);
            const rotateX = -10 * (touchY - 0.5);
            
            professorImg.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    }
    
    // Counting animation for stats
    const statValues = document.querySelectorAll('.stat-value');
    
    function animateStats() {
        statValues.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-value'));
            const duration = 2000;
            const startTime = performance.now();
            const startValue = 0;
            
            function updateCount(currentTime) {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                
                // Easing function for smoother animation
                const easedProgress = 1 - Math.pow(1 - progress, 3);
                
                const currentValue = Math.floor(startValue + easedProgress * (target - startValue));
                stat.innerText = currentValue.toLocaleString() + '+';
                
                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                }
            }
            
            requestAnimationFrame(updateCount);
        });
    }
    
    // Use Intersection Observer to trigger animation when stats are visible
    const statsContainer = document.querySelector('.stats-container');
    
    if (statsContainer && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.disconnect();
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsContainer);
    }
    
    // Scroll reveal animations
    const revealElements = document.querySelectorAll('.about-heading, .expertise-item, .cta-button-container');
    
    if (revealElements.length && 'IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        revealElements.forEach(element => {
            element.classList.add('reveal-element');
            revealObserver.observe(element);
        });
    }
});