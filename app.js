const express = require('express');
const app = express();

app.use((req, res) => {
    res.send("Serveur ouvert sur le port: 3000")
})

module.exports = app;