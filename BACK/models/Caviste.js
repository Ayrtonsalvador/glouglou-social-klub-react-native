const mongoose = require('mongoose');

var CavisteSchema = mongoose.Schema ({
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
    Desc: String,
    Photo: String

})

const CavisteModel = mongoose.model('cavistes', CavisteSchema);

module.exports = CavisteModel