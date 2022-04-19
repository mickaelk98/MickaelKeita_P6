require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');


//* connection a la mongoDB via mongoose
mongoose.connect(`mongodb+srv://${process.env.mongodb_user}:${process.env.mongodb_password}@cluster0.yecz7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


//* intercepte les requete de type json
app.use(express.json);

//* donne l'acces a tout le monde d'utiliser l'api
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use((req, res) => {
    res.send("Serveur ouvert sur le port: 3000");
});

module.exports = app;