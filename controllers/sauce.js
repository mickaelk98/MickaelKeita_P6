const Sauce = require('../models/Sauces')
const fs = require('fs')

//* controller pour crée une sauce
exports.creatSauce = (req, res, next) => {

    const sauceObject = JSON.parse(req.body.sauce)
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    })
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce crée' }))
        .catch(err => res.status(400).json({ err }))
}

//* controller pour modifier une sauce
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
        //* si l'on modifie l'image
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } :
        //* si l'on ne mofifie pas l'objet
        { ...req.body }
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifié' }))
        .catch(err => res.status(400).json({ err }))
}

//* route pour supprimer une sauce
exports.deleteSauce = (req, res, next) => {
    //* on cherche la sauce dans la base de donnée
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            //* si la sauce n'existe pas
            if (!sauce) {
                return res.status(404).json({ error: new Error('sauce non trouvé') })
            }
            //* si une personne essaye de supprimer une sauce qu'elle n'a pas crée
            if (sauce.userId !== req.auth.userId) {
                return res.status(401).json({ error: new Error('Requet non autorisée') })
            }
            //* sinon (la perssone qui veut supprimer la sauce est cele qui la crée) 
            else {
                //* recupre le nom de l'image
                const filename = sauce.imageUrl.split('/images/')[1]
                //* supprime l'image et la sauce
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ message: "sauce supprimé" }))
                        .catch(err => res.status(400).json({ err }))
                })
            }
        })
        .catch(err => res.status(400).json({ err }))
}


//* controller pour crée avoir toutes les sauces
exports.getAllSauce = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(err => res.status(400).json({ err }))
}

//* controller pour avoir une seul sauce
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(err => res.status(400).json({ err }))
}