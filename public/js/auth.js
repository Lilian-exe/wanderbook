// Local authentication functions
const LOCAL_USERS_KEY = 'local_users';
const CURRENT_USER_KEY = 'current_user';

// Initialize local users if not exists
function initializeLocalUsers() {
  if (!localStorage.getItem(LOCAL_USERS_KEY)) {
    localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify([]));
  }
}

// Login function
function handleLocalLogin(email, password) {
  initializeLocalUsers();
  const users = JSON.parse(localStorage.getItem(LOCAL_USERS_KEY));
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return { success: true, message: 'Autentificare reușită!', user };
  }
  return { success: false, message: 'Date de autentificare incorecte!' };
}

// Register function
function handleLocalRegister(name, email, password) {
  initializeLocalUsers();
  const users = JSON.parse(localStorage.getItem(LOCAL_USERS_KEY));
  
  if (users.find(u => u.email === email)) {
    return { success: false, message: 'Email-ul este deja înregistrat!' };
  }
  
  const newUser = { id: Date.now(), name, email, password };
  users.push(newUser);
  localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
  return { success: true, message: 'Cont creat cu succes!', user: newUser };
}

// LOGIN HANDLER
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm.email.value.trim();
    const password = loginForm.password.value.trim();

    if (!email || !password) {
      loginError.textContent = "Completează toate câmpurile!";
      return;
    }

    const result = handleLocalLogin(email, password);
    
    if (result.success) {
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('userName', result.user.name);
      window.location.href = '/';
    } else {
      loginError.textContent = result.message;
    }
  });
}

// REGISTER HANDLER
const registerForm = document.getElementById('register-form');
const registerError = document.getElementById('register-error');
const registerSuccess = document.getElementById('register-success');

if (registerForm) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = registerForm.name.value.trim();
    const email = registerForm.email.value.trim();
    const password = registerForm.password.value.trim();
    const confirmPassword = registerForm.confirmPassword.value.trim();

    if (!name || !email || !password || !confirmPassword) {
      registerError.textContent = "Completează toate câmpurile!";
      return;
    }

    if (password !== confirmPassword) {
      registerError.textContent = "Parolele nu coincid!";
      return;
    }

    const result = handleLocalRegister(name, email, password);
    
    if (result.success) {
      registerSuccess.textContent = result.message;
      registerError.textContent = '';
      registerForm.reset();
        setTimeout(() => {
          window.location.href = '/public/login.html';
        }, 2000);
    } else {
      registerError.textContent = result.message;
    }
  });
}

// LOGOUT HANDLER
const logoutBtn = document.getElementById('logout-btn');

if (logoutBtn) {
  logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userName');
    window.location.href = '/';
  });
}

// BUTTON VISIBILITY HANDLER
document.addEventListener('DOMContentLoaded', () => {
  const isLoggedIn = localStorage.getItem('loggedIn');
  const userName = localStorage.getItem('userName');
  const loginLink = document.querySelector('nav a[href*="login.html"]');
  const registerLink = document.querySelector('nav a[href*="register.html"]');
  const logoutLink = document.querySelector('nav a[href*="logout.html"]');
  const accountLink = document.querySelector('nav a[href*="account.html"]');
  const mainPageLogin = document.getElementById('login-main');
  const mainPageLogout = document.getElementById('logout-main');

  if (isLoggedIn) {
    if(loginLink) loginLink.style.display = 'none';
    if(registerLink) registerLink.style.display = 'none';
    if(logoutLink) logoutLink.style.display = 'inline-block';
    if(accountLink) accountLink.style.display = 'inline-block';
    
    if (mainPageLogin) mainPageLogin.style.display = 'none';
    if (mainPageLogout) mainPageLogout.style.display = 'inline-block';
    
    const greeting = document.querySelector('.user-greeting');
    if (greeting && userName) {
      greeting.textContent = `Bună, ${userName}!`;
    }
  } else {
    if(loginLink) loginLink.style.display = 'inline-block';
    if(registerLink) registerLink.style.display = 'inline-block';
    if(logoutLink) logoutLink.style.display = 'none';
    if(accountLink) accountLink.style.display = 'none';
    
    if (mainPageLogin) mainPageLogin.style.display = 'inline-block';
    if (mainPageLogout) mainPageLogout.style.display = 'none';
  }
});
