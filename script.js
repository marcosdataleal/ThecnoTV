// Smooth scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Efeito de scroll no header
const header = document.querySelector('.header');
let lastScrollPosition = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScrollPosition = currentScroll;
});

// Animar elementos quando aparecerem na viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar cards de diferenciais
document.querySelectorAll('.diferencial-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// Adicionar classe active ao link de navegação ativo
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Validação de carregamento de imagens
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.backgroundColor = '#e8e8e8';
        this.style.display = 'flex';
        this.style.alignItems = 'center';
        this.style.justifyContent = 'center';
        console.warn(`Imagem não encontrada: ${this.src}`);
    });
});

// Tooltip para botão WhatsApp
const whatsappBtn = document.querySelector('.whatsapp-button');
if (whatsappBtn) {
    whatsappBtn.title = 'Clique para abrir WhatsApp';
    
    // Adicionar animação de pulso
    whatsappBtn.style.animation = 'pulse 2s infinite';
}

// Adicionar estilos de animação dinamicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% {
            box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
        }
        50% {
            box-shadow: 0 4px 30px rgba(37, 211, 102, 0.6);
        }
        100% {
            box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
        }
    }
    
    .nav-link.active {
        color: var(--accent-color);
        font-weight: 600;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Função para abrir WhatsApp com mensagem pré-formatada
function openWhatsApp() {
    const message = encodeURIComponent('Olá Thecno TV! Gostaria de informações sobre os serviços');
    const phoneNumber = '5511947401684';
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
}

console.log('Script Thecno TV carregado com sucesso!');
