require('dotenv').config();
const express = require('express');
const app = express();
require('./config/db.config')
const path = require('path')
const cors = require('cors')

const userRoutes = require('./routes/user')
const sauceRoutes = require('./routes/sauce')


app.use(cors());

//* donne l'acces a tout le monde d'utiliser l'api
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


//* intercepte les requete de type json
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/api/sauces', sauceRoutes)
app.use('/api/auth', userRoutes);


module.exports = app;