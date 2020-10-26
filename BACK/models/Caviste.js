const mongoose = require('mongoose');

var CavisteSchema = mongoose.Schema ({
    Nom: String,
    Prenom: String,
    Tel: String,
    Email: String,
    MDP: String,
    Status: String,

    Domaine: String,
    Region : String,
    Photo: String,
    Desc: String
})

<<<<<<< HEAD
var CavisteModel = mongoose.model('Caviste', CavisteSchema);
=======
var CavisteModel = mongoose.model('cavistes', CavisteSchema);
>>>>>>> aaea61de93c2a2bf2860cae1f0f91d583517d97e

module.exports = CavisteModel;