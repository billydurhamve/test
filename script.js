// Load users
let users = [
  { username: "admin", password: "admin123", role: "admin", forms: [] },
  { username: "employee1", password: "password123", role: "employee", forms: [
      { name: "Employee Purchase Form", url: "https://script.google.com/macros/s/AKfycbwtMxTjHv8vDNfZeeoDl92i2lFeEivlvmZwIjkuxUBylhjIzInYN6gyXqS2qwAQ9aCLCQ/exec" }
    ] }
];

// ------------------- LOGIN FUNCTIONALITY -------------------
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
      document.getElementById("error-msg").innerText = "Invalid username or password!";
      return;
    }
    sessionStorage.setItem("currentUser", JSON.stringify(user));
    if (user.role === "admin") {
      window.location.href = "admin.html";
    } else {
      window.location.href = "dashboard.html";
    }
  });
}

// ------------------- ADMIN PAGE -------------------
function addUser() {
  const newUsername = document.getElementById("newUsername").value;
  const newPassword = document.getElementById("newPassword").value;
  const role = document.getElementById("role").value;
  if (!newUsername || !newPassword) return alert("Fill all fields");
  users.push({ username: newUsername, password: newPassword, role, forms: [] });
  alert("User added successfully!");
  renderUsers();
}

// Populate user dropdown for assigning forms
function populateUserDropdown() {
  const select = document.getElementById("userSelect");
  select.innerHTML = '<option value="">Select User</option>';
  users.filter(u => u.role === "employee").forEach(u => {
    const option = document.createElement("option");
    option.value = u.username;
    option.text = u.username;
    select.appendChild(option);
  });
}

// Assign form to user
function assignForm() {
  const username = document.getElementById("userSelect").value;
  const formName = document.getElementById("formName").value;
  const formURL = document.getElementById("formURL").value;
  if (!username || !formName || !formURL) return alert("Fill all fields!");
  
  const user = users.find(u => u.username === username);
  user.forms.push({ name: formName, url: formURL });
  
  alert(`Form "${formName}" assigned to ${username}`);
  renderUsers();
  document.getElementById("formName").value = "";
  document.getElementById("formURL").value = "";
}

// Render users table
function renderUsers() {
  const tbody = document.querySelector("#usersTable tbody");
  tbody.innerHTML = "";
  users.forEach(user => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${user.username}</td><td>${user.role}</td><td>${user.forms.map(f => f.name).join(", ")}</td>`;
    tbody.appendChild(tr);
  });
  populateUserDropdown();
}

if (document.querySelector("#usersTable")) {
  renderUsers();
}

// ------------------- EMPLOYEE DASHBOARD -------------------
if (document.getElementById("employeeName")) {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  document.getElementById("employeeName").innerText = currentUser.username;
  const formsList = document.getElementById("formsList");
  if (currentUser.forms.length === 0) formsList.innerHTML = "<p>No forms assigned yet.</p>";
  currentUser.forms.forEach(f => {
    const btn = document.createElement("button");
    btn.innerText = f.name;
    btn.onclick = () => window.open(f.url, "_blank");
    btn.style.display = "block";
    btn.style.margin = "10px 0";
    formsList.appendChild(btn);
  });
}

// ------------------- LOGOUT -------------------
function logout() {
  sessionStorage.removeItem("currentUser");
  window.location.href = "index.html";
}
    btn.innerText = f.name;
    btn.onclick = () => window.open(f.url, "_blank");
    btn.style.display = "block";
    btn.style.margin = "10px 0";
    formsList.appendChild(btn);
  });
}

function logout() {
  sessionStorage.removeItem("currentUser");
  window.location.href = "index.html";
}
