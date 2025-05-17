// LOGIN
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');

if(loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = loginForm.email.value.trim();
    const password = loginForm.password.value.trim();

    if (!email || !password) {
      loginError.textContent = "Completează toate câmpurile!";
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if(response.ok) {
        localStorage.setItem('token', data.token);
        window.location.href = '/';
      } else {
        loginError.textContent = data.message || "Eroare la autentificare.";
      }
    } catch (err) {
      loginError.textContent = "Eroare server, încearcă mai târziu.";
    }
  });
}

// REGISTER
const registerForm = document.getElementById('register-form');
const registerError = document.getElementById('register-error');
const registerSuccess = document.getElementById('register-success');

if(registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = registerForm.name.value.trim();
    const email = registerForm.email.value.trim();
    const password = registerForm.password.value.trim();
    const confirmPassword = registerForm.confirmPassword.value.trim();

    if (!name || !email || !password || !confirmPassword) {
      registerError.textContent = "Completează toate câmpurile!";
      return;
    }

    if(password !== confirmPassword) {
      registerError.textContent = "Parolele nu coincid!";
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if(response.ok) {
        registerSuccess.textContent = "Înregistrare realizată cu succes! Acum te poți loga.";
        registerError.textContent = '';
        registerForm.reset();
      } else {
        registerError.textContent = data.message || "Eroare la înregistrare.";
      }
    } catch (err) {
      registerError.textContent = "Eroare server, încearcă mai târziu.";
    }
  });
}

// LOGOUT și actualizare navbar
const logoutBtn = document.getElementById('logout-btn');

if(logoutBtn) {
  logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    window.location.href = '/';
  });
}

// Actualizare navbar după stare autentificare
document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  const loginLink = document.querySelector('nav a[href*="login.html"]');
  const registerLink = document.querySelector('nav a[href*="register.html"]');
  const logoutLink = document.querySelector('nav a[href*="logout.html"]');
  const accountLink = document.querySelector('nav a[href*="account.html"]');

  if(token) {
    if(loginLink) loginLink.style.display = 'none';
    if(registerLink) registerLink.style.display = 'none';
    if(logoutLink) logoutLink.style.display = 'inline-block';
    if(accountLink) accountLink.style.display = 'inline-block';
  } else {
    if(loginLink) loginLink.style.display = 'inline-block';
    if(registerLink) registerLink.style.display = 'inline-block';
    if(logoutLink) logoutLink.style.display = 'none';
    if(accountLink) accountLink.style.display = 'none';
  }
});
