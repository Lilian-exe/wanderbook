// Definirea planurilor turistice în memorie
const plans = [
  { id: 1, title: 'Călătorie Paris', country: 'Franța', description: 'Descoperă farmemul Parisului cu un city break vintage.', price: 350, image: '/public/assets/backgrounds/Paris.jpg', rating: 4.7 },
  { id: 2, title: 'București Explorer', country: 'România', description: 'Explorează capitala României cu stil retro și atracții locale.', price: 220, image: '/public/assets/backgrounds/Bucharest.jpg', rating: 4.3 },
  { id: 3, title: 'Adventură Istanbul', country: 'Turcia', description: 'Călătorește în Istanbul, orașul de pe două continente.', price: 310, image: '/public/assets/backgrounds/Istanbul.png', rating: 4.6 },
  { id: 4, title: 'Clasic Atena', country: 'Grecia', description: 'Vacanță vintage în Atena, orașul zeilor și al istoriei.', price: 330, image: '/public/assets/backgrounds/Athens.png', rating: 4.5 },
  { id: 5, title: 'Sofia Erudită', country: 'Bulgaria', description: 'Descoperă Sofia cu influențe balcanice și farmec vechi.', price: 210, image: 'public\assets\backgrounds\Sofia.jpg', rating: 4.2 },
  { id: 6, title: 'Roma Eternă', country: 'Italia', description: 'Vacanță retro în Roma, orașul etern.', price: 400, image: '/public/assets/backgrounds/Rome.jpg', rating: 4.8 },
  { id: 7, title: 'Vals Viena', country: 'Austria', description: 'Bucură-te de eleganța vieneză și atmosfera vintage.', price: 370, image: '/public/assets/backgrounds/Vienna.png', rating: 4.4 },
  { id: 8, title: 'Vis Praga', country: 'Republica Cehă', description: 'Descoperă Praga cu podurile și castelele sale.', price: 340, image: '/public/assets/backgrounds/Prague.png', rating: 4.5 },
  { id: 9, title: 'Lumini Budapesta', country: 'Ungaria', description: 'O experiență retro pe malul Dunării.', price: 320, image: '/public/assets/backgrounds/Budapest.png', rating: 4.3 },
  { id: 10, title: 'Tur Berlin', country: 'Germania', description: 'Tur vintage al Berlinului, orașul contrastelor.', price: 390, image: '/public/assets/backgrounds/Berlin.png', rating: 4.6 },
  { id: 11, title: 'Fiesta Madrid', country: 'Spania', description: 'Vacanță cu iz de anii 70 în capitala Spaniei.', price: 360, image: '/public/assets/backgrounds/Madrid.png', rating: 4.4 },
  { id: 12, title: 'Royal Londra', country: 'Regatul Unit', description: 'Descoperă Londra regală cu un aer retro.', price: 420, image: '/public/assets/backgrounds/London.png', rating: 4.7 },
]

document.addEventListener('DOMContentLoaded', () => {
  const filterToggle = document.getElementById('filter-toggle');
  const filterMenu = document.getElementById('filter-menu');
  const filterForm = document.getElementById('filter-form');
  const plansContainer = document.getElementById('plans-container');

  // Toggle filter menu on small screens
  if (filterToggle && filterMenu) {
    filterToggle.addEventListener('click', () => {
      filterMenu.classList.toggle('hidden');
    });
  }

  // Handle filter form submission
  if (filterForm) {
    filterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      applyFilters();
    });
  }

  // Initialize the page
  initializePage();

  function initializePage() {
    // Set up event listeners
    setupEventListeners();
    
    // Apply initial filters (none)
    applyFilters();
    
    // Set up mobile filter toggle
    setupMobileFilterToggle();
  }

  function setupEventListeners() {
    // Add event listeners for search and filter inputs
    const searchInput = document.getElementById('search');
    const priceMin = document.getElementById('price-min');
    const priceMax = document.getElementById('price-max');
    const countrySelect = document.getElementById('country');
    const ratingSelect = document.getElementById('rating');
    const sortSelect = document.getElementById('sort');

    [searchInput, priceMin, priceMax, countrySelect, ratingSelect, sortSelect].forEach(input => {
      if (input) {
        input.addEventListener('input', () => {
          applyFilters();
        });
      }
    });
  }

  function setupMobileFilterToggle() {
    // Check screen width and hide filter menu on small screens
    if (window.innerWidth < 768) {
      filterMenu.classList.add('hidden');
    }
    
    // Update filter visibility on window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) {
        filterMenu.classList.remove('hidden');
      } else {
        filterMenu.classList.add('hidden');
      }
    });
  }

  function applyFilters() {
    const filters = getFilterValues();
    const filteredPlans = filterPlans(filters);
    displayPlans(filteredPlans);
  }

  function getFilterValues() {
    return {
      search: document.getElementById('search')?.value.toLowerCase() || '',
      minPrice: parseFloat(document.getElementById('price-min')?.value) || 0,
      maxPrice: parseFloat(document.getElementById('price-max')?.value) || Number.MAX_VALUE,
      country: document.getElementById('country')?.value.toLowerCase() || '',
      rating: parseFloat(document.getElementById('rating')?.value) || 0,
      sort: document.getElementById('sort')?.value || ''
    };
  }

  function filterPlans(filters) {
    return plans
      .filter(plan => 
        (plan.title.toLowerCase().includes(filters.search) || 
         plan.description.toLowerCase().includes(filters.search) ||
         plan.country.toLowerCase().includes(filters.search)) &&
        plan.price >= filters.minPrice &&
        plan.price <= filters.maxPrice &&
        (filters.country === '' || plan.country.toLowerCase() === filters.country) &&
        plan.rating >= filters.rating
      )
      .sort((a, b) => {
        switch (filters.sort) {
          case 'price_asc':
            return a.price - b.price;
          case 'price_desc':
            return b.price - a.price;
          case 'rating_desc':
            return b.rating - a.rating;
          case 'title_asc':
            return a.title.localeCompare(b.title);
          default:
            return 0;
        }
      });
  }

  function displayPlans(filteredPlans) {
    if (filteredPlans.length === 0) {
      plansContainer.innerHTML = `
        <p class="no-results">Nu am găsit planuri de călătorie care să corespundă filtrelor selectate.</p>
      `;
      return;
    }    plansContainer.innerHTML = `
      <div class="results-count">${filteredPlans.length} rezultate găsite</div>
      ${filteredPlans.map(plan => `
          <div class="plan-card" data-id="${plan.id}">
            <div class="plan-card-image">
              <img src="${plan.image}" alt="${plan.title}">
              <div class="plan-card-country">${plan.country}</div>
            </div>
            <div class="card-content">
              <div class="card-header">
                <h3>${plan.title}</h3>
                <div class="rating" title="${plan.rating} stele">
                  <span class="rating-value">${plan.rating}</span>
                  <span class="rating-stars">${'★'.repeat(Math.round(plan.rating))}</span>
                </div>
              </div>
              <p class="card-description">${plan.description}</p>
              <div class="card-footer">
                <div class="price-tag">
                  <span class="price-value">${plan.price}</span>
                  <span class="price-currency">€</span>
                </div>
                <a href="/public/plan.html?id=${plan.id}" class="btn-details">Vezi detalii</a>
              </div>
            </div>
          </div>        `).join('')}
    `;
  }
});
