document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const planId = urlParams.get('id');
  const planContainer = document.getElementById('plan-container');
  const reviewsContainer = document.getElementById('reviews-container');

  if(!planId) {
    planContainer.innerHTML = "<p>Plan turistic invalid.</p>";
    return;
  }

  try {
    const response = await fetch(`/api/plans/${planId}`);
    const plan = await response.json();

    if(!response.ok) {
      planContainer.innerHTML = `<p>${plan.message || "Planul nu a fost găsit."}</p>`;
      return;
    }

    planContainer.innerHTML = `
      <h2>${plan.name}</h2>
      <div class="plan-images">
        ${plan.images.map(img => `<img src="${img}" alt="${plan.name}"/>`).join('')}
      </div>
      <p class="description">${plan.description}</p>
      <p class="price">Preț: ${plan.price} EUR</p>
      <button id="reserve-btn" class="reserve-btn">Rezervă acum</button>
    `;

    if(plan.reviews && plan.reviews.length > 0) {
      reviewsContainer.innerHTML = plan.reviews.map(r => `
        <div class="review-card">
          <p class="review-author">${r.author}</p>
          <p class="review-text">${r.text}</p>
          <p class="review-rating">Rating: ${r.rating} ⭐</p>
        </div>
      `).join('');
    } else {
      reviewsContainer.innerHTML = "<p>Nu există recenzii încă.</p>";
    }

    // Event rezervare (de ex. redirecționează către o pagină de rezervări)
    document.getElementById('reserve-btn').addEventListener('click', () => {
      window.location.href = `/reserve.html?planId=${planId}`;
    });

  } catch (err) {
    planContainer.innerHTML = "<p>Eroare la încărcarea detaliilor planului.</p>";
  }
});
