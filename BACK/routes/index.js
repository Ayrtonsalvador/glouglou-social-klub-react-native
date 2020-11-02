
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
  console.log('hello ?')
  res.render('index', { title: 'GlouGlou Social Club' });
});


// ---------------------- SIGN-UP --------------------\\
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
  console.log("DATA CAVISTE", dataCaviste)

  if (dataCaviste != null) {
    result = false;
    error.push('Utilisateur déjà présent')
  }

  if (error.length == 0 && req.body.statusFromFront === 'Caviste') {

    var salt = uid2(32)
    var newCaviste = new CavisteModel({
      Nom: req.body.usernameFromFront,
      Email: req.body.emailFromFront,
      Tel: req.body.telFromFront,
      Status: req.body.statusFromFront,
      MDP: SHA256(req.body.passwordFromFront + salt).toString(encBase64),
      token: uid2(32),
      salt: salt,
      Etablissement: '',
      Ville: '',
      Desc: '',
      Photo: '',
      MessagesS: [],
      MessagesR: []

    })
    saveCaviste = await newCaviste.save()

    if (saveCaviste) {
      result = true
      token = saveCaviste.token
    }
  }


  // SIGNUP VIGNERONS
  const dataVigneron = await VigneronModel.findOne({
    Email: req.body.emailFromFront
  })
  console.log("DATA VIGNERON", dataVigneron)

  if (dataVigneron != null) {
    result = false;
    error.push('Utilisateur déjà présent')
  }

  if (error.length == 0 && req.body.statusFromFront === 'Vigneron') {

    var salt = uid2(32)
    var newVigneron = new VigneronModel({
      Nom: req.body.usernameFromFront,
      Email: req.body.emailFromFront,
      Tel: req.body.telFromFront,
      Status: req.body.statusFromFront,
      MDP: SHA256(req.body.passwordFromFront + salt).toString(encBase64),
      token: uid2(32),
      salt: salt,
      Region: '',
      Ville: '',
      Desc: '',
      Photo: '',
      MessagesS: [],
      MessagesR: []

    })
    console.log("VIGNERON", newVigneron)
    saveVigneron = await newVigneron.save()

    if (saveVigneron) {
      result = true
      token = saveVigneron.token
    }
  }
  res.json({ result, saveCaviste, saveVigneron, error })
});




// ---------------------- SIGN-IN --------------------\\
router.post('/sign-in', async function (req, res, next) {

  var result = false
  var error = []
  var token = null
  var status = null

  // CHAMPS VIDES
  if (req.body.emailFromFront == ''
    || req.body.passwordFromFront == ''
  ) {
    error.push('veuillez compléter les champs vides !')
  }

  if (error.length == 0) {

    // SIGN-IN CAVISTES 
    const userCaviste = await CavisteModel.findOne({
      Email: req.body.emailFromFront,
    })
    // console.log("SIGN IN CAVISTE", userCaviste)

    if (userCaviste) {
      const passwordEncrypt = SHA256(req.body.passwordFromFront + userCaviste.salt).toString(encBase64)

      if (passwordEncrypt == userCaviste.MDP) {
        result = true
        token = userCaviste.token
        status = userCaviste.Status
      } else {
        result = false
        error.push('mot de passe ou email incorrect')
      }
    }

    // SIGN-IN VIGNERONS
    const userVigneron = await VigneronModel.findOne({
      Email: req.body.emailFromFront,
    })
    // console.log("SIGN IN VIGNERON", userVigneron)

    if (userVigneron) {
      const passwordEncrypt = SHA256(req.body.passwordFromFront + userVigneron.salt).toString(encBase64)

      if (passwordEncrypt == userVigneron.MDP) {
        result = true
        token = userVigneron.token
        status = userVigneron.Status
        // console.log("TOKEN", token)
      } else {
        result = false
        error.push('mot de passe ou email incorrect')
      }
    }
  }
  res.json({ result, error, token, status })
});

// ---------------- STATUS ---------------- \\
router.get('/get-status', async function (req, res, next) {

  const Vigneron = await VigneronModel.findOne({
    Email: req.body.emailFromFront
  } && { MDP: req.body.passwordFromFront })

  const Caviste = await CavisteModel.findOne({
    Email: req.body.emailFromFront
  } && { MDP: req.body.passwordFromFront })

  var status = null

  if (Caviste) {
    status = Caviste.status
  } else if (Vigneron) {
    status = Vigneron.status
  }

  res.json({ status })

});


// ---------------------- AJOUTER UNE REF --------------------\\
router.post('/AddVin', async function (req, res, next) {

  var newBouteille = new BouteilleModel({
    Nom: req.body.NomRefFF,
    Couleur: req.body.CouleurFF,
    AOC: req.body.AppellationFF,
    Desc: req.body.DescFF,
    Cepage: req.body.CepageFF,
    Millesime: req.body.MillesimeFF,
    Photo: req.body.ImageFF,
  })

  saveBouteille = await newBouteille.save()

  res.json({ saveBouteille })

});



// ---------------- INFOS VIGNERON  ---------------- \\
router.post('/info-update-v', async function (req, res, next) {

  const nomVigneron = await VigneronModel.findOne({
    Nom: req.body.nom
  })
  console.log("NOM", nomVigneron)

  var updateVigneron = await VigneronModel.updateOne(
    { Nom: req.body.nom }, {
    Photo: req.body.img,
    Nom: req.body.nom,
    Domaine: req.body.domaine,
    Region: req.body.region,
    Ville: req.body.ville,
    Desc: req.body.desc
  })

  res.json({ updateVigneron })

})

router.get('/info-v', async function (req, res, next) {
  var infos = []
  var token = null
  var user = await VigneronModel.findOne({ token: req.query.token })

  console.log("USER", user)

   console.log("TOKEN FOUND", req.query.token)

if (user != null) {
  res.json({ result: true, user })
} else {
  res.json({ result: false })
}
})


//---------------Mailbox CAVISTE--------------//

// BOITE DE RECEPTION
router.get('/mailbox-main', async function(req, res, next) {
  
  var Caviste = await CavisteModel.findOne(
    {token: req.query.token })

  var msgCaviste = Caviste.MessagesR

  res.json({ Caviste, msgCaviste, result:true })
});


// LIRE UN MESSAGE
router.get('/mailbox-read', async function(req, res, next) {

  var msgCaviste = await CavisteModel.findOne(
    {MessagesR: {Texte: req.body.Texte} } )

  res.json({ msgCaviste })

});


//OK - ECRIRE MESSAGE et l'enregistrer en bdd
router.post('/mailbox-write', async function(req, res, next) {
//  console.log(req.body.token);

  var msg = await CavisteModel.updateOne(
    {token: req.body.token}, {
        $push: {MessagesS: {Texte: req.body.Texte} }   
    });

  var searchVigneron = await VigneronModel.findOne({
        Nom: req.body.NomVigneron})

  if(searchVigneron!= null) {
  var msgVigneron = await VigneronModel.updateOne(
        {Nom: req.body.NomVigneron}, {
            $push: {MessagesR: {Texte: req.body.Texte} }   
        });
  }
  
  res.json({ msg, msgVigneron })

});




//---------------Mailbox VIGNERON--------------//

// BOITE DE RECEPTION
router.get('/mailbox-main-v', async function(req, res, next) {
  
  var Vigneron = await VigneronModel.findOne(
    {token: req.query.token })

  var msgVigneron = Vigneron.MessagesR

  res.json({ Vigneron, msgVigneron, result:true })
});


// LIRE UN MESSAGE
router.get('/mailbox-read-v', async function(req, res, next) {

  var msgVigneron = await VigneronModel.findOne(
    {MessagesR: {Texte: req.body.Texte} } )

  res.json({ msgVigneron })

});


//OK - ECRIRE MESSAGE et l'enregistrer en bdd
router.post('/mailbox-write-v', async function(req, res, next) {
//  console.log(req.body.token);

  var msg = await VigneronModel.updateOne(
    {token: req.body.token}, {
        $push: {MessagesS: {Texte: req.body.Texte} }   
    });

  var searchCaviste = await CavisteModel.findOne({
        Nom: req.body.NomCaviste})

  if(searchCaviste!= null) {
  var msgCaviste = await CavisteModel.updateOne(
        {Nom: req.body.NomCaviste}, {
            $push: {MessagesR: {Texte: req.body.Texte} }   
        });
  }
  
  res.json({ msg, msgCaviste })

});


// ---------------- INFOS CAVISTE ---------------- \\
router.post('/info-update-c', async function (req, res, next) {

  const nomCaviste = await CavisteModel.findOne({
    Nom: req.body.nom
  })
  console.log("NOM", nomCaviste)

  var updateCaviste = await CavisteModel.updateOne(
    { Nom: req.body.nom }, {
    Photo: req.body.img,
    Nom: req.body.nom,
    Etablissement: req.body.etablissement,
    Ville: req.body.ville,
    Desc: req.body.desc
  })

  res.json({ updateCaviste })

})

module.exports = router;