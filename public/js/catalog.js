document.addEventListener('DOMContentLoaded', () => {
  const filterBtn = document.getElementById('filter-btn');
  const filterPanel = document.getElementById('filter-panel');
  const plansContainer = document.getElementById('plans-container');
  const filterForm = document.getElementById('filter-form');

  if(filterBtn && filterPanel) {
    filterBtn.addEventListener('click', () => {
      filterPanel.classList.toggle('visible');
    });
  }

  if(filterForm) {
    filterForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const stars = filterForm.stars.value;
      const country = filterForm.country.value;
      const minPrice = filterForm.minPrice.value;
      const maxPrice = filterForm.maxPrice.value;

      const queryParams = new URLSearchParams();

      if(stars) queryParams.append('stars', stars);
      if(country) queryParams.append('country', country);
      if(minPrice) queryParams.append('minPrice', minPrice);
      if(maxPrice) queryParams.append('maxPrice', maxPrice);

      try {
        const response = await fetch('/api/plans?' + queryParams.toString());
        const plans = await response.json();

        displayPlans(plans);
      } catch (err) {
        plansContainer.innerHTML = "<p>Eroare la încărcarea planurilor.</p>";
      }
    });
  }

  function displayPlans(plans) {
    if(!plans.length) {
      plansContainer.innerHTML = "<p>Nu s-au găsit planuri pentru criteriile selectate.</p>";
      return;
    }

    plansContainer.innerHTML = plans.map(plan => `
      <div class="plan-card" data-id="${plan.id}">
        <img src="${plan.image}" alt="${plan.name}">
        <h3>${plan.name}</h3>
        <p>Țară: ${plan.country}</p>
        <p>Preț: ${plan.price} EUR</p>
        <p>Rating: ${plan.rating} ⭐</p>
        <a href="/plan.html?id=${plan.id}" class="btn-primary">Detalii</a>
      </div>
    `).join('');
  }

  // Initial load fără filtre
  if(filterForm) filterForm.dispatchEvent(new Event('submit'));
});
