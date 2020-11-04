
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var uniqid = require('uniqid');
var fs = require('fs');

var uid2 = require('uid2')
var SHA256 = require('crypto-js/sha256')
var encBase64 = require('crypto-js/enc-base64')

var cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: 'dvqjak***',
  api_key: '767287626552***',
  api_secret: 'BRfbaQzy3xSWMq0dNqdLAS***'
});

var BouteilleModel = require('../models/Bouteille');
var CavisteModel = require('../models/Caviste');
var VigneronModel = require('../models/Vigneron');
const { populate } = require('../models/Bouteille');

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
  // console.log("DATA VIGNERON", dataVigneron)

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
    // console.log("VIGNERON", newVigneron)
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
    console.log("SIGN IN CAVISTE", userCaviste)

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
    console.log()
    console.log("SIGN IN VIGNERON", userVigneron)

    if (userVigneron) {
      const passwordEncrypt = SHA256(req.body.passwordFromFront + userVigneron.salt).toString(encBase64)

      if (passwordEncrypt == userVigneron.MDP) {
        result = true
        token = userVigneron.token
        status = userVigneron.Status
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

// ---------------------- AJOUTER & SUPPR UNE REF --------------------\\
router.post('/AddVin', async function (req, res, next) {

  const vigneronID = await VigneronModel.findOne({ token: req.body.tokenFF })
  console.log("TOKEN MA CAVE", vigneronID)


  var newBouteille = new BouteilleModel({

    // IdVigneron: ID,
    Nom: req.body.NomRefFF,
    Couleur: req.body.CouleurFF,
    AOC: req.body.AppellationFF,
    Desc: req.body.DescFF,
    Cepage: req.body.CepageFF,
    Millesime: req.body.MillesimeFF,
    IdVigneron: vigneronID.id
    // token: req.body.tokenFF
    // Photo: req.body.ImageFF,
  })

  saveBouteille = await newBouteille.save()
  console.log("SAVE BOUTEILLE", saveBouteille)

  res.json({ saveBouteille })

});

router.get('/macave', async function (req, res, next) {

  // Trouver les infos de la bouteille par vigneron
  const user = await VigneronModel.findOne({ token: req.query.token })
  console.log("TOKEN MA CAVE", user)

  if (user) {
    var ID = user._id;

    const infosUser = {
      NomV: user.Nom,
      Domaine: user.Domaine,
      Ville: user.Ville,
      Region: user.Region,
    }
    console.log("")

    var cave = await BouteilleModel.find({ IdVigneron: ID })
      .populate('IdVigneron')
      .exec();
    console.log("CAVE", cave)

    if (cave != null) {
      res.json({ result: true, cave, infosUser })
    } else {
      res.json({ result: false })
    }
  }
})

router.delete('/delete-ref/:Nom', async function (req, res, next) {

  var result = false

  var suppr = await BouteilleModel.deleteOne({ nomVin: req.params.nom })
  console.log("SUPPR VIN", suppr)

  if (suppr.deletedCount == 1) {
    result = true
  }

  res.json({ result })
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
    Desc: req.body.desc,
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

// BOITE DE RECEPTION - OK
router.get('/mailbox-main', async function (req, res, next) {

  var Caviste = await CavisteModel.findOne(
    { token: req.query.token })

  console.log("Caviste Mailbox", Caviste)

  var msgCaviste = Caviste.MessagesR

  if (Caviste != null) {
    res.json({ Caviste, msgCaviste, result: true })
  } else {
    res.json({ result: false })
  }
});


// LIRE UN MESSAGE - OK
router.get('/mailbox-read', async function (req, res, next) {

  var msgClicked = await CavisteModel.findOne(
    { MessagesR: { Texte: req.body.Texte } })

  res.json({ msgClicked })

});


//PUSHER LE NOM DES CAVISTES A ENVOYER UX VIGNERONS
router.post('/mailbox-write', async function (req, res, next) {

  var msg = await CavisteModel.updateOne(
    { token: req.body.token }, {
    $push: { MessagesS: { Texte: req.body.Texte } }
  });

  var searchVigneron = await VigneronModel.findOne({
    Nom: req.body.NomVigneron
  })

  if (searchVigneron != null) {
    var msgVigneron = await VigneronModel.updateOne(
      { Nom: req.body.NomVigneron }, {
      $push: { MessagesR: { Texte: req.body.Texte } }
    });
  }

  res.json({ msg, msgVigneron })

});


//---------------Mailbox VIGNERON--------------//

// BOITE DE RECEPTION - REPRENDRE MAIL MAIN C
router.get('/mailbox-main-v', async function (req, res, next) {

  var Vigneron = await VigneronModel.findOne(
    { token: req.query.token })

  var msgVigneron = Vigneron.MessagesR

  res.json({ Vigneron, msgVigneron, result: true })
});


// LIRE UN MESSAGE - REPRENDRE READ C
router.get('/mailbox-read-v', async function (req, res, next) {

  var msgVigneron = await VigneronModel.findOne(
    { MessagesR: { Texte: req.body.Texte } })

  res.json({ msgVigneron })

});


//OK
router.get('/mailbox-write-v', async function (req, res, next) {

  var Vigneron = await VigneronModel.findOne(
    { token: req.query.token })

  if (Vigneron != null) {
    res.json({ Vigneron, result: true })
  } else {
    res.json({ result: false })
  }
});

// ECRIRE MESSAGE et l'enregistrer en bdd - OK
router.post('/mailbox-write-v', async function (req, res, next) {
  //  console.log(req.body.token);

  var msg = await VigneronModel.updateOne(
    { token: req.body.token }, {
    $push: {
      MessagesS: {
        Texte: req.body.Texte,
        Nom: req.body.NomCaviste
      }
    }
  });

  var searchCaviste = await CavisteModel.findOne({
    Nom: req.body.NomCaviste
  })

  if (searchCaviste != null) {
    var msgCaviste = await CavisteModel.updateOne(
      { Nom: req.body.NomCaviste }, {
      $push: {
        MessagesR: {
          Texte: req.body.Texte,
          Nom: req.body.NomVigneron
        }
      }
    });
  }

  res.json({ msg, msgCaviste })

});


// ---------------- INFOS CAVISTE ---------------- \\
router.post('/info-update-c', async function (req, res, next) {

  //update les infos
  const Caviste = await CavisteModel.findOne({
    token: req.body.token
  })

  console.log("NOM", Caviste)

  var updateCaviste = await CavisteModel.updateOne(
    { token: req.body.token }, {
    Nom: req.body.nom,
    Etablissement: req.body.etablissement,
    Ville: req.body.ville,
    Region: req.body.region,
    Desc: req.body.desc
  })

  // update la photo
  console.log("TOKEN")
  console.log("PHOTO", req.files.avatar.uri);
  console.log("AVATAR", req.files.userinfos);

  res.json({ updateCaviste })

})

router.get('/info-c', async function (req, res, next) {
  var infos = []
  var token = null
  var user = await CavisteModel.findOne({ token: req.query.token })

  // console.log("TOKEN FOUND", req.query.token)

  if (user != null) {
    res.json({ result: true, user })
  } else {
    res.json({ result: false })
  }
})

// ---------------- CATALOGUE CAVISTE ---------------- \\

router.get('/catalogue', async function (req, res, next) {

  // var userCaviste = await CavisteModel.findOne({ token: req.query.token })
  // console.log("TOKEN FOUND", req.query.token)

  var catalogue = await BouteilleModel.find()
    .populate('IdVigneron')
    .exec()
  console.log("CATALOGUE", catalogue)

  if (catalogue != null) {
    res.json({ result: true, catalogue })
  } else {
    res.json({ result: false })
  }
})

// ---------------- FAVORIS CAVISTE ---------------- \\
router.post('/add-favoris', async function (req, res, next) {

  // const caviste = await CavisteModel.findOne({
  //   token: req.body.tokenFF
  // })
  // console.log("TOKEN FAVORIS", req.body.tokenFF)

  // BOUTEILLE NULL - CHANGER FIND ONE ?
  const bouteille = await BouteilleModel.findOne({
    ID: req.body.IdFF
  })
  console.log("Favoris", bouteille)

  var favorisCaviste = await CavisteModel.updateOne(
    { token: req.body.tokenFF }, {
    $push: {
      Favoris:
      {
        Nom: req.body.NomFF,
        Couleur: req.body.CouleurFF,
        Millesime: req.body.MillesimeFF,
        Cepage: req.body.CepageFF,
        Desc: req.body.DescFF,
        AOC: req.body.AOCFF,
        NomVi: req.body.NomViFF,
        RegionVi: req.body.RegionViFF,
        DescVi: req.body.DescViFF
      },
      // {Photo: req.body.PhotoFF} 
    }
  })

  if (favorisCaviste != null) {
    res.json({ result: true, bouteille, favorisCaviste })
  } else {
    res.json({ result: false })
  }
})

router.get('/favoris', async function (req, res, next) {

  var favCaviste = await CavisteModel.findOne({ token: req.query.token })
  console.log("TOKEN FOUND", req.query.token)

  if (favCaviste != null) {
    res.json({ result: true, favCaviste })
  } else {
    res.json({ result: false })
  }
})

module.exports = router;