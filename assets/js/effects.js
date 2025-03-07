document.addEventListener("DOMContentLoaded", function() {
    const aboutSection = document.getElementById("about");
    const aboutHeader = document.createElement("div");
    aboutHeader.classList.add("about-header");
    
    aboutHeader.innerHTML = `
        <h2>Sobre o Professor Alan Soares</h2>
        <p>Domine disciplinas exatas com aulas práticas e conteúdo completo!</p>
    `;
    
    aboutSection.appendChild(aboutHeader);
    
    // Add a fade-in effect to the about section
    aboutSection.style.opacity = 0;
    aboutSection.style.transition = "opacity 1s ease-in-out";
    
    setTimeout(() => {
        aboutSection.style.opacity = 1;
    }, 100);
    
    // Add scroll animations for elements within the about section
    const aboutContent = document.querySelectorAll(".about-content");
    aboutContent.forEach((element) => {
        element.style.opacity = 0;
        element.style.transform = "translateY(20px)";
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = "translateY(0)";
                    entry.target.style.transition = "opacity 0.5s ease, transform 0.5s ease";
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(element);
    });
});