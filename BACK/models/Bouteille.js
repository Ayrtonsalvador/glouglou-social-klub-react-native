const mongoose = require('mongoose');

var BouteilleSchema = mongoose.Schema ({
    IdVigneron: { type: mongoose.Schema.Types.ObjectId, ref: 'Vigneron' },
    Nom: String,
    Couleur: String,
    AOC: String,
    Desc: String,
    Cepage: String,
    Millesime: String,
    Photo: String,

})

const BouteilleModel = mongoose.model('bouteilles', BouteilleSchema);

module.exports = BouteilleModel