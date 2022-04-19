const http = require('http');
const app = require('./app')

//* lancement d'express' sur le port 3000
app.set('port', process.env.PORT || 3000)

//* creation du serveur
const server = http.createServer(app);

//* lancement du serveur node sur le port 3000
server.listen(process.env.PORT || 3000);