(() => {
  const USERS_KEY = 'pulsecv_users';
  const ACTIVE_KEY = 'pulsecv_active_user';

  const loadUsers = () => {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    } catch {
      return [];
    }
  };

  const saveUsers = (users) => localStorage.setItem(USERS_KEY, JSON.stringify(users));

  const setActive = (user) => localStorage.setItem(ACTIVE_KEY, JSON.stringify(user));

  const hash = (val) => btoa(unescape(encodeURIComponent(val)));

  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim().toLowerCase();
      const password = document.getElementById('loginPassword').value;
      const users = loadUsers();
      const user = users.find((u) => u.email === email && u.password === hash(password));
      if (!user) {
        alert('Invalid credentials. Try again or sign up.');
        return;
      }
      setActive({ email: user.email, name: user.name });
      window.location.href = 'dashboard.html';
    });
  }

  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('signupName').value.trim();
      const email = document.getElementById('signupEmail').value.trim().toLowerCase();
      const password = document.getElementById('signupPassword').value;
      const users = loadUsers();
      if (users.some((u) => u.email === email)) {
        alert('Account already exists. Please log in.');
        return;
      }
      users.push({ name, email, password: hash(password) });
      saveUsers(users);
      setActive({ name, email });
      window.location.href = 'dashboard.html';
    });
  }
})();
