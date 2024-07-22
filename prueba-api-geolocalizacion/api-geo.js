fetch('https://ipapi.co/json/')
  .then(response => response.json())
  .then(data => {
    const isArgentina = data.country_code === 'AR';
    const priceElements = document.querySelectorAll('.price');
    
    priceElements.forEach(element => {
      const dollarPrice = parseFloat(element.dataset.usd);
      if (isArgentina) {
        // Cambio de dólares a pesos (usa una tasa de cambio actualizada)
        const pesoPrice = dollarPrice * 350; // Ejemplo de tasa
        element.textContent = `${pesoPrice.toFixed(2)} ARS`;
      } else {
        element.textContent = `${dollarPrice.toFixed(2)} USD`;
      }
    });
  })
  .catch(error => console.error('Error:', error));