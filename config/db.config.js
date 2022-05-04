const mongoose = require('mongoose');

//* connection a la mongoDB via mongoose
mongoose.connect(`mongodb+srv://${process.env.mongodb_user}:${process.env.mongodb_password}@cluster0.z3t8m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
