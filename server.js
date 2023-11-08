const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});




// Dummy user for example
const user = {
  username: 'user1',
  password: 'password123' // In a real app, this should be hashed
};

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // For demo purposes, we'll just check if the credentials match the dummy user
  if (username === user.username && password === user.password) {
    req.session.user = user;
    res.redirect('/dashboard');
  } else {
    res.redirect('/');
  }
});

app.get('/dashboard', (req, res) => {
  if (req.session.user) {
    res.render('dashboard', { user: req.session.user });
  } else {
    res.redirect('/');
  }
});


app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

