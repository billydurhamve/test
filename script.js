document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('/users');
    const users = await res.json();
    const user = users.find(u => u.username === username && u.password === password);

    if(user){
      sessionStorage.setItem('user', JSON.stringify(user));
      if(user.role === 'admin') window.location.href = 'admin.html';
      else window.location.href = 'dashboard.html';
    } else {
      document.getElementById('errorMsg').innerText = 'Invalid username or password.';
    }
  } catch (err) {
    document.getElementById('errorMsg').innerText = 'Error loading user data.';
    console.error(err);
  }
});
