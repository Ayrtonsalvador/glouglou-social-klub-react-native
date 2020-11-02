const mongoose = require('mongoose');

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

var VigneronSchema = mongoose.Schema ({
    MessagesS: [MessageSentSchema],
    MessagesR: [MessageReceivedSchema],
    Nom: String,
    Prenom: String,
    Tel: String,
    Email: String,
    MDP: String,
    Status: String,
    token: String,
    salt: String, 

    Domaine: String,
    Ville: String,
    Region : String,
    Photo: String,
    Desc: String,

})

const VigneronModel = mongoose.model('vignerons', VigneronSchema);

module.exports = VigneronModel;
