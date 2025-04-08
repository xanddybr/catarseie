const express = require('express')
const {engine} = require('express-handlebars')
const app = express()

// Set up Handlebars as the view engine
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

// Route to render the home page
app.get('/', (req, res) => {
    res.render('home')
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
});