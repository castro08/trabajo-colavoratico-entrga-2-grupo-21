// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');
    
    // Menú móvil
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Cambiar icono del botón
        if (navMenu.classList.contains('active')) {
            mobileMenuBtn.textContent = '✕';
        } else {
            mobileMenuBtn.textContent = '☰';
        }
    });
    
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuBtn.textContent = '☰';
        });
    });
    
    // Formulario de contacto
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validación básica
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                showNotification('Por favor, complete todos los campos obligatorios.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Por favor, ingrese un correo electrónico válido.', 'error');
                return;
            }
            
            // Simular envío del formulario
            showNotification('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.', 'success');
            
            // Limpiar formulario
            contactForm.reset();
        });
    }
    
    // Formulario de newsletter
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (!email) {
                showNotification('Por favor, ingrese su correo electrónico.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Por favor, ingrese un correo electrónico válido.', 'error');
                return;
            }
            
            // Simular suscripción
            showNotification('¡Gracias por suscribirte! Ahora recibirás nuestras actualizaciones.', 'success');
            
            // Limpiar formulario
            newsletterForm.reset();
        });
    }
    
    // Scroll suave para enlaces de anclaje
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Cerrar menú móvil si está abierto
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenuBtn.textContent = '☰';
                }
                
                // Scroll suave
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animación de elementos al hacer scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.service-card, .testimonial-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Inicializar estilos para animación
    document.querySelectorAll('.service-card, .testimonial-card').forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Ejecutar animación al cargar y al hacer scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Funciones auxiliares
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showNotification(message, type) {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.padding = '15px 20px';
        notification.style.borderRadius = '4px';
        notification.style.color = 'white';
        notification.style.zIndex = '1000';
        notification.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        notification.style.maxWidth = '300px';
        
        if (type === 'success') {
            notification.style.background = 'var(--accent)';
        } else {
            notification.style.background = '#ff4757';
        }
        
        document.body.appendChild(notification);
        
        // Eliminar notificación después de 3 segundos
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 3000);
    }
});




document.addEventListener("DOMContentLoaded", () => {
  const reviewsContainer = document.getElementById("reviewsList");

  // Cargar el JSON reseñas
  fetch("src/data/reviews.json")
    .then(res => res.json())
    .then(reviews => {
        console.log(reviews)
      reviews.forEach(r => {
        // Crear tarjeta
        const card = document.createElement("div");
        card.classList.add("review-card");

        // Autor + avatar + rol/fecha
        card.innerHTML = `
          <div class="review-author">
            <div class="author-avatar">${r.avatar}</div>
            <div>
              <strong>${r.author}</strong>
              <div class="review-meta">${r.role} · ${r.date}</div>
            </div>
          </div>
          <p>"${r.review}"</p>
          <div class="stars">${"★".repeat(r.stars)}${"☆".repeat(5 - r.stars)}</div>
        `;

        // Agregar al contenedor
        reviewsContainer.appendChild(card);
      });
    })
    .catch(err => console.error("Error cargando reseñas:", err));
});


