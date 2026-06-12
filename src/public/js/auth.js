// Script global que se carga en todas las páginas.
// Su función es mostrar u ocultar los links del navbar según si el usuario está logueado.

window.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  const userRaw = localStorage.getItem('user');

  const guestLinks = document.getElementById('guestLinks');
  const authLinks = document.getElementById('authLinks');
  const userNameEl = document.getElementById('userName');

  if (token && userRaw) {
    // Usuario logueado: mostramos los links de sesión iniciada
    const user = JSON.parse(userRaw);

    if (guestLinks) guestLinks.style.display = 'none';
    if (authLinks) authLinks.style.display = 'flex';
    if (userNameEl) userNameEl.textContent = user.fullName.split(' ')[0]; // Solo el primer nombre

    // Cargamos la cantidad de ítems del carrito al inicio
    loadCartCount(token);
  } else {
    // Sin sesión: mostramos los links de guest
    if (guestLinks) guestLinks.style.display = 'flex';
    if (authLinks) authLinks.style.display = 'none';
  }
});

// Obtiene la cantidad de ítems del carrito para mostrar en el navbar
async function loadCartCount(token) {
  try {
    const response = await fetch('/api/v1/cart', {
      headers: { 'Authorization': `Bearer ${token}` },
    });

    if (response.ok) {
      const result = await response.json();
      const cartCountEl = document.getElementById('cartCount');
      if (cartCountEl && result.data) {
        cartCountEl.textContent = result.data.itemCount;
      }
    }
  } catch (error) {
    // Si falla, simplemente no actualizamos el contador
  }
}

// Cierra la sesión: borra el token y redirige al inicio
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/';
}
