const Sauce = require('../models/Sauces')

exports.likeSauce = (req, res, next) => {

    //* recuper le userId et le like
    const userId = req.body.userId
    const like = req.body.like

    Sauce.findOne({ _id: req.params.id })
        .then((data) => {
            //* si userId n'est pas dans userLiked et like = 1
            if (!data.usersLiked.includes(userId) && like === 1) {
                Sauce.updateOne(
                    { _id: req.params.id },
                    {
                        $inc: { likes: 1 },
                        $push: { usersLiked: userId }
                    }

                )
                    .then(() => res.status(201).json({ message: 'Vous avez bien liké la sauce' }))
                    .catch(err => res.status(400).json({ err }))
            }

            //* si userId est pas dans userLiked et like = 0
            if (data.usersLiked.includes(userId) && like === 0) {
                Sauce.updateOne(
                    { _id: req.params.id },
                    {
                        $inc: { likes: -1 },
                        $pull: { usersLiked: userId }
                    }

                )
                    .then(() => res.status(201).json({ message: 'Vous avez enlevez votre like' }))
                    .catch(err => res.status(400).json({ err }))
            }

            //* si userId n'est pas dans userDisliked et like = -1
            if (!data.usersDisliked.includes(userId) && like === -1) {
                Sauce.updateOne(
                    { _id: req.params.id },
                    {
                        $inc: { dislikes: 1 },
                        $push: { usersDisliked: userId }
                    }

                )
                    .then(() => res.status(201).json({ message: 'Vous avez bien disliké la sauce' }))
                    .catch(err => res.status(400).json({ err }))
            }

            //* si userId est pas dans userLiked et like = 0
            if (data.usersDisliked.includes(userId) && like === 0) {
                Sauce.updateOne(
                    { _id: req.params.id },
                    {
                        $inc: { dislikes: -1 },
                        $pull: { usersDisliked: userId }
                    }

                )
                    .then(() => res.status(201).json({ message: 'Vous avez enlevez votre dislike' }))
                    .catch(err => res.status(400).json({ err }))
            }

        })
        .catch(err => res.status(404).json({ err }))
}