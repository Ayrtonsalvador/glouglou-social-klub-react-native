const mongoose = require('mongoose');

var BouteilleSchema = mongoose.Schema ({
    IdVigneron: { type: mongoose.Schema.Types.ObjectId, ref: 'vignerons' },
    Nom: String,
    Couleur: String,
    AOC: String,
    Desc: String,
    Cepage: String,
    Millesime: String,
    Photo: String,
})

var BouteilleModel = mongoose.model('Bouteille', BouteilleSchema);

module.exports = BouteilleModel;
