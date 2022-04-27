const express = require('express')
const router = express.Router()
const sauceCtrl = require('../controllers/sauce')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

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

module.exports = router;