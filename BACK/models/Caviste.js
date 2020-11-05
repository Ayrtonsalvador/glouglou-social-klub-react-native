const mongoose = require('mongoose');
const { stringify } = require('crypto-js/enc-base64');

var FavorisSchema = mongoose.Schema ({
    Nom: String,
    Couleur: String, 
    Millesime: String,
    Cepage: String, 
    Desc: String, 
    AOC: String,
    Photo: String,
    
    NomVi: String, 
    RegionVi: String, 
    DescVi: String,
    PhotoVi: String,
})

var MessageSentSchema = mongoose.Schema ({
    Nom: String,
    Texte: String,
    Photo: String,
    Read: Boolean
})

var MessageReceivedSchema = mongoose.Schema ({
    Nom: String,
    Texte: String,
    Photo: String,
    Read: Boolean
})

var CavisteSchema = mongoose.Schema ({
    MessagesS: [MessageSentSchema],
    MessagesR: [MessageReceivedSchema],
    Favoris: [FavorisSchema],
    Nom: String,
    Prenom: String,
    Tel: String,
    Email: String,
    MDP: String,
    Status: String,
    token: String,
    salt: String, 
    
    Etablissement: String,
    Ville: String,
    Region: String,
    Desc: String,
    Photo: String
})

const CavisteModel = mongoose.model('cavistes', CavisteSchema);

module.exports = CavisteModel