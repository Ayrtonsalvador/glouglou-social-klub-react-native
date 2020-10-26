const mongoose = require('mongoose');

var VigneronSchema = mongoose.Schema ({
    Nom: String,
    Prenom: String,
    Tel: String,
    Email: String,
    MDP: String,

    Etablissement: String,
    Ville: String,
    Desc: String,
    Photo: String
})

const VigneronModel = mongoose.model('Vigneron', VigneronSchema);

module.exports = VigneronModel