fetch('https://ipapi.co/json/')
  .then(response => response.json())
  .then(data => {
    const isArgentina = data.country_code === 'AR';
    const priceElements = document.querySelectorAll('.price');
    
    priceElements.forEach(element => {
      if (isArgentina) {
        const arsPrice = element.dataset.ars;
        element.textContent = `${arsPrice} ARS`;
      } else {
        const usdPrice = element.dataset.usd;
        element.textContent = `${usdPrice} USD`;
      }
    });
  })
  .catch(error => console.error('Error:', error));