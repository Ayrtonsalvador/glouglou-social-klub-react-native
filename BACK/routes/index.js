
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var router = express.Router();

var uid2 = require('uid2')
var SHA256 = require('crypto-js/sha256')
var encBase64 = require('crypto-js/enc-base64')

var BouteilleModel = require('../models/Bouteille');
var CavisteModel = require('../models/Caviste');
var VigneronModel = require('../models/Vigneron');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'GlouGlou Social Club' });
});

router.post('/sign-up', async function (req, res, next) {
  var error = []
  var result = false
  var saveCaviste = null
  var saveVigneron = null

  // CHAMPS VIDES
  if (req.body.usernameFromFront == ''
    || req.body.emailFromFront == ''
    || req.body.telFromFront == ''
  ) {
    error.push('veuillez compléter les champs vides !')
  }

  // SIGNUP CAVISTES
  const dataCaviste = await CavisteModel.findOne({
    Email: req.body.emailFromFront
  })

  if (dataCaviste != null) {
    result = false;
    error.push('Utilisateur déjà présent')
  }

  if (error.length == 0 && req.body.statusFromFront === 'Caviste') {

    result = true;

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

  if (dataVigneron != null) {
    result = false;
    error.push('Utilisateur déjà présent')
  }

  if (error.length == 0 && req.body.statusFromFront === 'Vigneron') {

    result = true;

    var newVigneron = new VigneronModel({
      Nom: req.body.usernameFromFront,
      Email: req.body.emailFromFront,
      Tel: req.body.telFromFront,
      Status: req.body.statusFromFront,

    })
    console.log("VIGNERON", newVigneron)
    saveVigneron = await newVigneron.save()
  }

  res.json({ result, saveCaviste, saveVigneron, error })
});

// ----------------------WORK IN PROGRESS --------------------\\

router.post('/sign-in', async function (req, res, next) {

  var result = false
  var user = null
  var error = []
  var token = null

  if (req.body.emailFromFront == ''
    || req.body.passwordFromFront == ''
  ) {
    error.push('veuillez compléter les champs vides !')
  }

  if (error.length == 0) {
    result = true;

    // SIGN-IN CAVISTES - 1ERE ID
    const userCaviste = await CavisteModel.findOne({
      Email: req.body.emailFromFront,
    })
    console.log("SIGN IN CAVISTE", userCaviste)
  }

  if (userCaviste) {
    saveCaviste.push({
      MDP: SHA256(req.body.passwordFromFront + user.salt).toString(encBase64),
      token: uid2(32),
      salt: salt
    })
  }

  // SIGN-IN VIGNERONS - 1ERE ID
//   const userVigneron = await VigneronModel.findOne({
//     Email: req.body.emailFromFront,
//   })
//   console.log("SIGN IN VIGNERON", userCaviste)
// }

// 2EME ID
//   if(passwordEncrypt == user.password){
//     result = true
//     token = user.token
//   } else {
//     result = false
//     error.push('mot de passe incorrect')
//   }

// } else {
//   error.push('email incorrect')
// }
res.json({ result, user, error, token })
});

//AJOUTER UNE REF
router.post('/AddVin', async function(req, res, next) {

  var newBouteille = new BouteilleModel({
    Nom: req.body.NomRefFF,
    Couleur: req.body.CouleurFF,
    AOC: req.body.AppellationFF,
    Desc: req.body.DescFF,
    Cepage: req.body.CepageFF,
    Millesime: req.body.MillesimeFF,
  })

  saveBouteille = await newBouteille.save()

  res.json({saveBouteille})

});

router.get('/get-status', async function(req, res, next) {

  const Vigneron = await VigneronModel.findOne({
    Email: req.body.emailFromFront
  } && {MDP : req.body.passwordFromFront})

  const Caviste = await CavisteModel.findOne({
      Email: req.body.emailFromFront 
    } && {MDP : req.body.passwordFromFront})

      var status = null

      if (Caviste) {
        status = Caviste.status
      } else if (Vigneron) {
        status = Vigneron.status
      }

  res.json({status})

});

module.exports = router;