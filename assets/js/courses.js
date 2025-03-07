document.addEventListener('DOMContentLoaded', function() {
    console.log('Script de cursos carregado - Versão Ultra Premium 2.0');
    
    // Implementar o flip dos cards de forma robusta
    function setupCardFlip() {
        // Botões para virar para o verso (info)
        document.querySelectorAll('.flip-button:not(.back-flip-button)').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Encontrar o card-inner mais próximo
                const cardInner = this.closest('.card-inner');
                if (cardInner) {
                    cardInner.classList.add('flipped');
                    console.log('Card virado para o verso');
                }
            });
        });
        
        // Botões para virar de volta para a frente
        document.querySelectorAll('.back-flip-button').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Encontrar o card-inner mais próximo
                const cardInner = this.closest('.card-inner');
                if (cardInner) {
                    cardInner.classList.remove('flipped');
                    console.log('Card virado para a frente');
                }
            });
        });
        
        // Garantir que botões "Saiba Mais" e outros links não virem o card
        document.querySelectorAll('.card-button, .btn-premium').forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                console.log('Botão clicado sem virar o card');
            });
        });
    }
    
    // Função para adicionar botões caso faltem em algum card
    function ensureButtonsExist() {
        // Verificar e adicionar botões de flip se necessário
        document.querySelectorAll('.card-inner').forEach((card, index) => {
            // Adicionar botão de flip para a frente do card
            if (!card.querySelector('.flip-button:not(.back-flip-button)')) {
                const flipBtn = document.createElement('button');
                flipBtn.className = 'flip-button';
                flipBtn.setAttribute('aria-label', 'Ver detalhes do curso');
                flipBtn.innerHTML = '<i class="fas fa-info"></i>';
                card.appendChild(flipBtn);
                console.log(`Botão de info adicionado ao card ${index+1}`);
            }
            
            // Adicionar botão de voltar no verso do card
            const cardBack = card.querySelector('.card-back');
            if (cardBack && !cardBack.querySelector('.back-flip-button')) {
                const backBtn = document.createElement('button');
                backBtn.className = 'flip-button back-flip-button';
                backBtn.setAttribute('aria-label', 'Voltar para a frente do card');
                backBtn.innerHTML = '<i class="fas fa-undo"></i> Voltar';
                cardBack.appendChild(backBtn);
                console.log(`Botão de voltar adicionado ao card ${index+1}`);
            }
        });
    }
    
    // Adicionar animações de entrada
    function setupEntryAnimations() {
        const cards = document.querySelectorAll('.course-card-premium');
        
        cards.forEach((card, index) => {
            // Configurar estado inicial
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            // Animar entrada com delay sequencial
            setTimeout(() => {
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 * (index + 1));
        });
    }
    
    // Inicializar todas as funções
    function init() {
        ensureButtonsExist();
        setupCardFlip();
        setupEntryAnimations();
        console.log('Inicialização completa dos cards premium');
    }
    
    // Executar inicialização
    init();
});