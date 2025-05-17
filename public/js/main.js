function initNavbar() {
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;
  const logo = document.getElementById('logo');
  const navLinks = document.getElementById('nav-links');

  // Link-urile navbarului, exemplu: dacă nu ești logat
  const links = [
    { text: 'Acasă', href: 'index.html' },
    { text: 'Catalog', href: 'catalog.html' },
    { text: 'Login', href: 'login.html' },
    { text: 'Register', href: 'register.html' }
  ];

  // Exemplu: dacă ești logat, schimbi link-urile astfel
  // const loggedLinks = [
  //   { text: 'Acasă', href: '#' },
  //   { text: 'Catalog', href: 'catalog.html' },
  //   { text: 'Cont', href: 'account.html' },
  //   { text: 'Logout', href: 'logout.html' }
  // ];

  // Aici poți schimba links în funcție de autentificare
  navLinks.innerHTML = links.map(link => 
    `<a href="${link.href}">${link.text}</a>`
  ).join('');

  // Popup logo
  let popup;
  logo.addEventListener('mouseenter', () => {
    popup = document.createElement('div');
    popup.className = 'logo-popup';
    popup.textContent = "WanderBook - platforma ta pentru călătorii și rezervări rapide.";
    popup.style.position = 'absolute';
    popup.style.background = '#333';
    popup.style.color = '#fff';
    popup.style.padding = '5px 10px';
    popup.style.borderRadius = '5px';
    const rect = logo.getBoundingClientRect();
    popup.style.top = `${rect.bottom + window.scrollY + 5}px`;
    popup.style.left = `${rect.left + window.scrollX}px`;
    popup.style.zIndex = 1000;
    document.body.appendChild(popup);
  });
  logo.addEventListener('mouseleave', () => {
    if(popup) popup.remove();
  });

  // Theme management
  const currentTheme = localStorage.getItem("theme");

  if (currentTheme === "dark") {
    enableDarkMode();
  } else if (currentTheme === "light") {
    disableDarkMode();
  } else {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      enableDarkMode();
    }
  }

  themeToggle.addEventListener("click", () => {
    if (body.classList.contains("dark-mode")) {
      disableDarkMode();
    } else {
      enableDarkMode();
    }
  });

  function enableDarkMode() {
    body.classList.add("dark-mode");
    themeToggle.textContent = "☀️";
    localStorage.setItem("theme", "dark");
    updateHeroTextColor('light');
  }

  function disableDarkMode() {
    body.classList.remove("dark-mode");
    themeToggle.textContent = "🌙";
    localStorage.setItem("theme", "light");
    updateHeroTextColor('dark');
  }

  // Schimbă culoarea textului din hero în funcție de tema curentă
  function updateHeroTextColor(theme) {
    const heroTitle = document.getElementById('hero-title');
    const heroSubtitle = document.getElementById('hero-subtitle');
    if(!heroTitle || !heroSubtitle) return;

    if(theme === 'dark') {
      heroTitle.style.color = '#222';
      heroSubtitle.style.color = '#222';
    } else {
      heroTitle.style.color = '#eee';
      heroSubtitle.style.color = '#eee';
    }
  }

  // La start, setează culoarea textului corectă
  if(body.classList.contains("dark-mode")) {
    updateHeroTextColor('light');
  } else {
    updateHeroTextColor('dark');
  }
}

// Fundal slideshow (5 imagini, dark overlay)
function initBackgroundSlideshow() {
  const hero = document.getElementById('hero');
  if(!hero) return;

  const backgrounds = [
    "assets/backgrounds/bg1.jpg",
    "assets/backgrounds/bg2.jpg",
    "assets/backgrounds/bg3.jpg",
    "assets/backgrounds/bg4.jpg",
    "assets/backgrounds/bg5.jpg"
  ];

  let index = 0;

  function changeBackground() {
    const imageUrl = backgrounds[index];
    // Adaugă overlay negru semitransparent pentru lizibilitate
    hero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${imageUrl}')`;
    index = (index + 1) % backgrounds.length;
  }

  changeBackground();
  setInterval(changeBackground, 6000);
}

window.initNavbar = initNavbar;
window.initBackgroundSlideshow = initBackgroundSlideshow;

// Sticky navbar la scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  if(window.scrollY > 50) {
    navbar.classList.add('navbar-scrolled');
  } else {
    navbar.classList.remove('navbar-scrolled');
  }
});
