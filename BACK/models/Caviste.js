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

var CavisteSchema = mongoose.Schema ({
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
    
    Etablissement: String,
    Ville: String,
    Region: String,
    Desc: String,
    Photo: String
})

const CavisteModel = mongoose.model('cavistes', CavisteSchema);

module.exports = CavisteModel