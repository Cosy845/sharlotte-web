// ================================================
// 🚀 SHARLOTTE STYLES - SUPER SAIYAN EDITION
// Lead Creative Developer: Awwwards Level
// ================================================

// ================================================
// 1️⃣ CURSOR PERSONALIZADO (LUXURY)
// ================================================
const cursorDot = document.querySelector('.cursor-dot');
const cursorCircle = document.querySelector('.cursor-circle');

let mouseX = 0, mouseY = 0;
let dotX = 0, dotY = 0;
let circleX = 0, circleY = 0;

// Seguir el mouse
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Animación suave con delay (magnetic effect)
function animateCursor() {
    // Punto sigue directo
    dotX += (mouseX - dotX) * 0.9;
    dotY += (mouseY - dotY) * 0.9;
    
    // Círculo sigue con delay
    circleX += (mouseX - circleX) * 0.15;
    circleY += (mouseY - circleY) * 0.15;
    
    cursorDot.style.left = dotX + 'px';
    cursorDot.style.top = dotY + 'px';
    
    cursorCircle.style.left = circleX + 'px';
    cursorCircle.style.top = circleY + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Expandir cursor en hover
const interactiveElements = document.querySelectorAll('a, button, .btn, .nav-link, .counter-item, .service-category, .carousel-btn, input, select, textarea');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
    });
    
    el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
    });
});

// ================================================
// 2️⃣ BOTONES MAGNÉTICOS
// ================================================
const magneticButtons = document.querySelectorAll('.btn, .carousel-btn, .whatsapp-float');

magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// ================================================
// 3️⃣ PRELOADER BLINDADO (SOLUCIÓN PANTALLA NEGRA)
// ================================================
const hidePreloader = () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
    }
};

// Intento 1: Carga normal
window.addEventListener('load', hidePreloader);

// Intento 2 (SEGURIDAD): Si en 1.8 segs no ha cargado, abre a la fuerza
setTimeout(hidePreloader, 1800);

// ================================================
// 4️⃣ HEADER GLASSMORPHISM + PARALLAX HERO
// ================================================
const header = document.getElementById('header');
const heroContent = document.querySelector('.hero-content');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    // Header transparente → glassmorphism
    header.classList.toggle('scrolled', currentScroll > 50);
    
    // PARALLAX FADE-OUT del Hero (evita choque con menú)
    if (window.scrollY < window.innerHeight) {
        const scrolled = window.scrollY;
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / 700);
    }
    
    lastScroll = currentScroll;
});

// ================================================
// 5️⃣ MENÚ MÓVIL
// ================================================
const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
    hamburger.classList.toggle('active');
    document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ================================================
// 6️⃣ SCROLL REVEAL
// ================================================
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    }
);

revealElements.forEach(el => revealObserver.observe(el));

// ================================================
// 7️⃣ CONTADORES ANIMADOS (15+ AÑOS)
// ================================================
const counters = document.querySelectorAll('.counter');
let counterPlayed = false;

const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

const counterObserver = new IntersectionObserver(
    (entries) => {
        if (entries[0].isIntersecting && !counterPlayed) {
            counterPlayed = true;
            
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const duration = 2500;
                const startTime = performance.now();
                
                const updateCounter = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const easedProgress = easeOutQuart(progress);
                    const current = Math.floor(easedProgress * target);
                    
                    if (progress < 1) {
    counter.innerText = current;
    requestAnimationFrame(updateCounter);
} else {
    counter.innerText = target + ""; 
}
                };
                
                requestAnimationFrame(updateCounter);
            });
        }
    },
    { threshold: 0.5 }
);

const mindsetSection = document.getElementById('mindset');
if (mindsetSection) counterObserver.observe(mindsetSection);

// ================================================
// 8️⃣ CARRUSEL AUTOMÁTICO
// ================================================
const slides = document.querySelectorAll('.carousel-slide');
let currentSlide = 0;
let isTransitioning = false;

function nextSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
    
    setTimeout(() => {
        isTransitioning = false;
    }, 1200);
}

function prevSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    
    setTimeout(() => {
        isTransitioning = false;
    }, 1200);
}

document.getElementById('nextBtn').addEventListener('click', nextSlide);
document.getElementById('prevBtn').addEventListener('click', prevSlide);

// Auto-play
let autoplayInterval = setInterval(nextSlide, 5000);

const carousel = document.querySelector('.carousel');
carousel.addEventListener('mouseenter', () => {
    clearInterval(autoplayInterval);
});

carousel.addEventListener('mouseleave', () => {
    autoplayInterval = setInterval(nextSlide, 5000);
});

// ================================================
// 9️⃣ FORMULARIO CONECTADO A PYTHON (CEREBRO) 🧠
// ================================================
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name');
    const service = document.getElementById('service');
    const message = document.getElementById('message');
    const toastText = toast.querySelector('span'); // Para cambiar el mensaje del toast
    
    // --- VALIDACIÓN VISUAL (SHAKE) ---
    let isValid = true;
    
    if (!name.value.trim()) {
        name.closest('.form-group').classList.add('error');
        isValid = false;
        setTimeout(() => name.closest('.form-group').classList.remove('error'), 500);
    }
    
    if (!service.value) {
        service.closest('.form-group').classList.add('error');
        isValid = false;
        setTimeout(() => service.closest('.form-group').classList.remove('error'), 500);
    }
    
    if (!isValid) return;
    
    // --- CONEXIÓN CON PYTHON (FETCH API) ---
    
    // 1. Mostrar aviso de carga
    toastText.innerText = "Conectando con el servidor...";
    toast.classList.add('show');

    // 2. Empaquetar los datos
    const formData = {
        name: name.value.trim(),
        service: service.value,
        message: message.value.trim()
    };

    // 3. Enviar a Python (/process_booking)
    fetch('/process_booking', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        // Python respondió con éxito
        if (data.status === 'success') {
            toastText.innerText = "¡Cita procesada! Abriendo WhatsApp...";
            
            // Esperar un poquito y redirigir con el link que creó Python
            setTimeout(() => {
                window.open(data.whatsapp_link, '_blank');
                
                // Limpiar todo
                setTimeout(() => {
                    toast.classList.remove('show');
                    toastText.innerText = "¡Redirigiendo a WhatsApp..."; // Reset texto original
                }, 1000);
                contactForm.reset();
            }, 1500);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        toastText.innerText = "Error de conexión 😢";
        setTimeout(() => toast.classList.remove('show'), 3000);
    });
});

// ================================================
// 🔟 SMOOTH SCROLL
// ================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ================================================
// 1️⃣1️⃣ LAZY LOADING MEJORADO
// ================================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.6s ease';
                
                setTimeout(() => {
                    img.style.opacity = '1';
                }, 100);
                
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

console.log('✨ Sharlotte Styles - SUPER SAIYAN MODE ACTIVATED 🚀');
