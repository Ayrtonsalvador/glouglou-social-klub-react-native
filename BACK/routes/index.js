
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

  // CHAMPS VIDES
  if(req.body.usernameFromFront == ''
  || req.body.emailFromFront == ''
  || req.body.telFromFront == ''
  ){
    error.push('veuillez compléter les champs vides !')
  }

  // SIGNUP CAVISTES
  const dataCaviste = await CavisteModel.findOne({
    Email: req.body.emailFromFront
  })

  console.log("DATA CAVISTE", dataCaviste)

  if(dataCaviste != null){
    error.push('Utilisateur déjà présent')
  }

  if(error.length == 0 && req.body.statusFromFront === 'Caviste'){

    var newCaviste = new CavisteModel({
      Nom: req.body.usernameFromFront,
      Email: req.body.emailFromFront,
      Tel: req.body.telFromFront,
      Status: req.body.statusFromFront,
      
    })
    saveCaviste = await newCaviste.save()
  }
  
  // console.log("CAVISTE", saveCaviste)

  // SIGNUP VIGNERONS
  const dataVigneron = await VigneronModel.findOne({
    Email: req.body.emailFromFront
  })

  if(dataVigneron != null){
    error.push('Utilisateur déjà présent')
  }

  if(error.length == 0 && req.body.statusFromFront === 'Vigneron'){

    var newVigneron = new VigneronModel({
      Nom: req.body.usernameFromFront,
      Email: req.body.emailFromFront,
      Tel: req.body.telFromFront,
      Status: req.body.statusFromFront,

    })
    console.log("VIGNERON", newVigneron)
    saveVigneron = await newVigneron.save()
  }

    res.json({result, saveCaviste, saveVigneron, error})
});

router.post('/sign-in', async function(req, res, next) {
  res.json('index', { title: 'Express' });
});

module.exports = router;