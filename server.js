const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

function readUsers(){
  return JSON.parse(fs.readFileSync(path.join(__dirname, 'users.json')));
}

function writeUsers(users){
  fs.writeFileSync(path.join(__dirname, 'users.json'), JSON.stringify(users, null, 2));
}

// Get all users
app.get('/users', (req, res) => {
  res.json(readUsers());
});

// Add new user
app.post('/addUser', (req, res) => {
  const { username, password, role } = req.body;
  const users = readUsers();
  if(users.find(u => u.username === username)) return res.status(400).send('User already exists');
  users.push({ username, password, role, forms: [] });
  writeUsers(users);
  res.send('User added');
});

// Assign form to user
app.post('/assignForm', (req, res) => {
  const { username, form } = req.body;
  const users = readUsers();
  const user = users.find(u => u.username === username);
  if(!user) return res.status(400).send('User not found');
  user.forms.push(form);
  writeUsers(users);
  res.send('Form assigned');
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
