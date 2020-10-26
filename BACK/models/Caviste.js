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

    Domaine: String,
    Region : String,
    Photo: String,
    Desc: String
})

var CavisteModel = mongoose.model('cavistes', CavisteSchema);

module.exports = CavisteModel;