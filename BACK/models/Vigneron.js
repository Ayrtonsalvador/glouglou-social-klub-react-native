const mongoose = require('mongoose');

var VigneronSchema = mongoose.Schema ({
    Nom: String,
    Prenom: String,
    Tel: String,
    Email: String,
    MDP: String,
    Status: String,

    Domaine: String,
    Ville: String,
    Region : String,
    Photo: String,
    Desc: String

})

var VigneronModel = mongoose.model('Vigneron', VigneronSchema);

module.exports = VigneronModel;
