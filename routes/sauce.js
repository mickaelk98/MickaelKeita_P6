const express = require('express')
const router = express.Router()
const sauceCtrl = require('../controllers/sauce')
const likeCtrl = require('../controllers/like')
const auth = require('../middleware/auth')
const multer = require('../config/multer.config')

//* route pour crée une sauce
router.post('/', auth, multer, sauceCtrl.creatSauce)

//* route pour modifier une sauce
router.put('/:id', auth, multer, sauceCtrl.modifySauce)

//* route pour supprimer une sauce
router.delete('/:id', auth, multer, sauceCtrl.deleteSauce)

//* route pour avoire toutes les sauces
router.get('/', auth, sauceCtrl.getAllSauce)

//* route pour avoire une seul sauce
router.get('/:id', auth, sauceCtrl.getOneSauce)

//* route pour like et dislike une sauce
router.post('/:id/like', auth, likeCtrl.likeSauce)

module.exports = router;