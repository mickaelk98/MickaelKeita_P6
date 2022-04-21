const User = require('../models/Users');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

//* midlleware pour l'inscription 
exports.signup = (req, res, next) => {
    //* cryptage du mot de passe
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            //* creation d'un nouveau utilisateur avec le MDP heshé
            const user = new User({
                email: req.body.email,
                password: hash
            })
            //* enregistrement du nouveau utilisateur dans la base de donnée
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur ajouté' }))
                .catch(err => res.status(400).json({ err }))
        })
        .catch(err => res.status(500).json({ err }))
};

//* midlleware pour la connection
exports.login = (req, res, next) => {
    //* recherche si le mail de la requete est dans la base de donné
    User.findOne({ email: req.body.email })
        //* si la requete s'est bien passé, verifie si l'utilisateur exite
        .then(user => {
            //* si l'utilisateur n'existe pas
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé' })
            }
            //* sinon 
            else {
                //* compare le MDP de la requete et celui dans MongoDB
                bcrypt.compare(req.body.password, user.password)
                    //* retourne un booleen pour MDP correct ou incorrect
                    .then(valid => {
                        //* si MDP incorrect
                        if (!valid) {
                            return res.status(401).json({ error: 'Mot de passe incorect' })
                        }
                        //* sinon
                        else {
                            res.status(200).json({
                                userId: user._id,
                                token: jwt.sign(
                                    { userId: user._id },
                                    `${process.env.secret_key}`,
                                    { expiresIn: '24h' }
                                )
                            })
                        }
                    })
                    .catch(err => res.status(500).json({ err }))
            }
        })
        //* si la requete s'est mal passé
        .catch(err => res.status(500).json({ err }))
};