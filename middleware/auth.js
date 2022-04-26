const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        //* recuper le token dans le header
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, `${process.env.secret_key}`)
        const userId = decodedToken.userId
        req.auth = { userId }
        if (req.body.userId && req.body.userId !== userId) {
            throw 'user ID non valable'
        } else {
            next();
        }
    } catch (err) {
        res.status(401).json({ error: err | 'Requte non authentifiée' })
    }
}