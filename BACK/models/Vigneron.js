const mongoose = require('mongoose');

var VigneronSchema = mongoose.Schema ({
    Nom: String,
    Prenom: String,
    Tel: String,
    Email: String,
    MDP: String,
    Status: String,

    Etablissement: String,
    Ville: String,
    Desc: String,
    Photo: String
})

var VigneronModel = mongoose.model('Vigneron', VigneronSchema);

module.exports = VigneronModel;
