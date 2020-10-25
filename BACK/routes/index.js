
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var uid2 = require('uid2')
var SHA256 = require('crypto-js/sha256')
var encBase64 = require('crypto-js/enc-base64')

var BouteilleModel = require('../models/Bouteille');
var CavisteModel = require('../models/Caviste');
var VigneronModel = require('../models/Vigneron');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'GlouGlou Social Club' });
});

router.post('/sign-up', async function(req, res, next) {
  var error = []
  var result = false
  var saveCaviste = null
  var saveVigneron = null

  // SIGNUP CAVISTES
  const dataCaviste = await CavisteModel.findOne({
    email: req.body.emailFromFront
  })

  if(dataCaviste != null){
    error.push('utilisateur déjà présent')
  }

  if(req.body.usernameFromFront == ''
  || req.body.emailFromFront == ''
  || req.body.telFromFront == ''
  ){
    error.push('champs vides')
  }

  if(error.length == 0){

    var newCaviste = new CavisteModel({
      username: req.body.usernameFromFront,
      email: req.body.emailFromFront,
      telephone: req.body.telFromFront,
      status: req.body.statusFromFront,
      
    })
  }
    saveCaviste = await newCaviste.save()

  // SIGNUP VIGNERONS
  const dataVigneron = await VigneronModel.findOne({
    email: req.body.emailFromFront
  })

  if(dataVigneron != null){
    error.push('utilisateur déjà présent')
  }

  if(req.body.usernameFromFront == ''
  || req.body.emailFromFront == ''
  || req.body.telFromFront == ''
  ){
    error.push('champs vides')
  }

  if(error.length == 0){

    var newVigneron = new VigneronModel({
      username: req.body.usernameFromFront,
      email: req.body.emailFromFront,
      telephone: req.body.telFromFront,
      status: req.body.statusFromFront,

    })
  }
    saveVigneron = await newVigneron.save()

    res.json({result, saveCaviste, saveVigneron, error})
});

router.post('/sign-in', async function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;