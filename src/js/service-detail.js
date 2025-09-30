// service-detail.js - comportamiento para la sección "Desarrollo de Software"
document.addEventListener('DOMContentLoaded', function() {
  const serviceSection = document.getElementById('service-detail');
  if (!serviceSection) return;

  // galerÍa
  const mainImg = document.getElementById('mainServiceImage');
  const thumbs = serviceSection.querySelectorAll('.thumb');

  thumbs.forEach(t => {
    t.addEventListener('click', () => {
      // swap main image
      const full = t.getAttribute('data-full');
      if (full) mainImg.src = full;

      // active class
      thumbs.forEach(x => x.classList.remove('active'));
      t.classList.add('active');
    });
  });

  // selección de paquete -> actualizar precio
  const packageSelect = document.getElementById('packageSelect');
  const priceEl = document.getElementById('servicePrice');

  function formatCOP(n) {
    try {
      return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(n);
    } catch (e) {
      return '$ ' + n.toLocaleString();
    }
  }

  function updatePriceFromSelect() {
    const opt = packageSelect.selectedOptions[0];
    const p = parseInt(opt.getAttribute('data-price'), 10) || parseInt(priceEl.dataset.basePrice, 10);
    priceEl.textContent = formatCOP(p);
    priceEl.dataset.currentPrice = p;
  }

  packageSelect.addEventListener('change', updatePriceFromSelect);
  updatePriceFromSelect(); // inicial

  // Compra / Cotización
  const buyBtn = document.getElementById('buyServiceBtn');
  const quoteBtn = document.getElementById('quoteBtn');
  const favBtn = document.getElementById('favBtn');

  function showToast(msg, type='info') {
    const n = document.createElement('div');
    n.className = 'service-toast';
    n.textContent = msg;
    n.style.position = 'fixed';
    n.style.right = '20px';
    n.style.top = '20px';
    n.style.zIndex = 1200;
    n.style.padding = '12px 16px';
    n.style.borderRadius = '8px';
    n.style.boxShadow = '0 6px 18px rgba(0,0,0,0.25)';
    n.style.color = '#fff';
    n.style.background = (type === 'success') ? 'var(--accent)' : (type === 'error') ? '#ff4757' : '#333';
    document.body.appendChild(n);
    setTimeout(()=> { n.style.opacity = '0'; n.style.transition='opacity .4s'; setTimeout(()=> n.remove(),400); }, 3000);
  }

  buyBtn.addEventListener('click', () => {
    // Simula agregar al carrito / proceso de compra
    const currentPrice = priceEl.dataset.currentPrice || priceEl.dataset.basePrice;
    // aquí podrías llamar a tu función de carrito real o enviar a checkout
    showToast(`Servicio agregado. Precio: ${formatCOP(parseInt(currentPrice,10))}`, 'success');
    // ejemplo simple: guardar en localStorage
    try {
      const cart = JSON.parse(localStorage.getItem('synergy_cart') || '[]');
      cart.push({ service: 'Desarrollo de Software', package: packageSelect.value, price: parseInt(currentPrice,10), date: Date.now() });
      localStorage.setItem('synergy_cart', JSON.stringify(cart));
    } catch(e) { /* noop */ }
  });

  quoteBtn.addEventListener('click', () => {
    // lleva al formulario de contacto (si existe) o abrir mailto
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      showToast('Se ha desplazado al formulario de contacto. Completa los datos para solicitar cotización.');
    } else {
      // fallback: abrir mail
      const subject = encodeURIComponent('Solicitud de cotización - Desarrollo de Software');
      const body = encodeURIComponent('Hola, deseo recibir una cotización para Desarrollo de Software. Paquete: ' + packageSelect.value);
      window.location.href = `mailto:ventas@synergy.com?subject=${subject}&body=${body}`;
    }
  });

  favBtn.addEventListener('click', () => {
    const pressed = favBtn.getAttribute('aria-pressed') === 'true';
    favBtn.setAttribute('aria-pressed', (!pressed).toString());
    favBtn.style.opacity = (!pressed) ? '1' : '0.6';
    showToast((!pressed) ? 'Servicio agregado a favoritos' : 'Servicio removido de favoritos', 'info');
  });

  // Hacer clickable cada related-card -> navegación a id o búsqueda
  serviceSection.querySelectorAll('.related-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.service;
      // comportamiento: navegar a sección o abrir modal — aquí se simula scroll al formulario
      const contactEl = document.getElementById('contact');
      if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      showToast('Interesado en ' + card.querySelector('h3').textContent + '. Complete el formulario para más detalles.');
    });
  });

});
