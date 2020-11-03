
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

// FAIRE TRANSITER COTER FRONT

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


 // var infovin = JSON.parse(req.body.infoVin)
 // console.log("infoVin", req.body.infoVin)
 // console.log("infovin", infovin)
 
   // Cloudinary
   // var resultCloudinaryUrl = newBouteille.Photo
 
   // if (req.files.image != undefined) {
   //   var imagePath = './tmp/' + uniqid() + '.jpg';
   //   var resultCopy = await req.files.image.mv(imagePath);
   //   console.log("RESULT IMG", resultCopy)
 
   //   if (!resultCopy) {
   //     resultCloudinary = await cloudinary.uploader.upload(imagePath);
   //     resultCloudinaryUrl = resultCloudinary.url
   //     console.log("URL", resultCloudinaryUrl)
   //   } else {
   //     error.push("Problème d'upload de l'image")
   //   }
   //   fs.unlinkSync(imagePath);
   // }
 
 
 // var newBouteille = new BouteilleModel({
 //   token: token,
 //   Nom: Nom,
 //   Couleur: Couleur,
 //   AOC: Appellation,
 //   Desc: Desc,
 //   Cepage: Cepage,
 //   Millesime: Millesime,
 //   // Photo: resultCloudinaryUrl,
 // })
 // saveBouteille = await newBouteille.save()
 // console.log("BOUTEILLE", saveBouteille)
 
 // res.json({ saveBouteille, infovin })

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

    var cave = await BouteilleModel.find({IdVigneron : ID })
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

// BOITE DE RECEPTION
router.get('/mailbox-main', async function(req, res, next) {
  
  var Caviste = await CavisteModel.findOne(
    {token: req.query.token })

  var msgCaviste = Caviste.MessagesR
  console.log("CE MSG CAVISTE", msgCaviste)

  res.json({ Caviste, msgCaviste, result:true })
});


// LIRE UN MESSAGE
router.get('/mailbox-read', async function(req, res, next) {

  var msgClicked = await CavisteModel.findOne(
    {MessagesR: {Texte: req.body.Texte} } )

  res.json({ msgClicked })

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
            $push: {MessagesR:
               {Texte: req.body.Texte, 
                Nom: req.query.Nom} 
              }   
        });
  }
  
  res.json({ msg, msgVigneron })
});



router.get('/mailbox-write-getuser', async function(req, res, next) {

  var user = await CavisteModel.findOne(
    {token: req.query.token} )

    console.log("GET USER", user)

  res.json({ user, result:true })

});



// REPONDRE A UN VIGNERON
router.post('/mailbox-write-ans', async function(req, res, next) {
  //  console.log(req.body.token);
  
    var msg = await CavisteModel.updateOne(
      {token: req.body.token}, {
          $push: {MessagesS: {Texte: req.body.Texte} }   
      });
  
    // var searchVigneron = await VigneronModel.findOne({
    //       Nom: req.body.NomVigneron})
  
 
    var answerVigneron = await VigneronModel.updateOne(
          {Nom: req.body.NomVigneron}, {
              $push: {MessagesR: {Texte: req.body.Texte} }   
          });
    
    
    res.json({ msg, answerVigneron })
  
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

// REPONDRE A UN CAVISTE
// router.post('/mailbox-write-v-ans', async function(req, res, next) {
//   //  console.log(req.body.token);
  
//     var msg = await VigneronModel.updateOne(
//       {token: req.body.token}, {
//           $push: {MessagesS: {Texte: req.body.Texte} }   
//       });
  
//     var searchCaviste = await CavisteModel.findOne({
//           Nom: req.body.NomCaviste})
  
//     if(searchCaviste!= null) {
//     var msgCaviste = await CavisteModel.updateOne(
//           {Nom: req.body.NomCaviste}, {
//               $push: {MessagesR: {Texte: req.body.Texte} }   
//           });
//     }
    
//     res.json({ msg, msgCaviste })
  
  // });


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
 
  console.log ("TOKEN")
  console.log("PHOTO" ,req.files.avatar.uri);
  console.log("AVATAR" ,req.files.userinfos);

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

  var user = await CavisteModel.findOne({ token: req.query.token })
  console.log("TOKEN FOUND", req.query.token)

  var catalogue = await BouteilleModel.find()
  console.log("CATALOGUE", catalogue)

  if (catalogue != null) {
    res.json({ result: true, catalogue, user })
  } else {
    res.json({ result: false })
  }
})

module.exports = router;