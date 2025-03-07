document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('header');
  const textContent = document.querySelector('.text-content');

  header.addEventListener('mousemove', (e) => {
    const xPos = (e.clientX / window.innerWidth) - 0.5;
    const yPos = (e.clientY / window.innerHeight) - 0.5;
    
    gsap.to(textContent, {
      x: xPos * 20,
      y: yPos * 20,
      duration: 0.8,
      ease: "power1.out"
    });
    
    gsap.to('#particles-js', {
      x: xPos * -30,
      y: yPos * -30,
      duration: 1,
      ease: "power1.out"
    });
  });
});