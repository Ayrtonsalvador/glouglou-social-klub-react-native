const mongoose = require('mongoose');

var BouteilleSchema = mongoose.Schema ({
<<<<<<< HEAD

    IdVigneron: { type: mongoose.Schema.Types.ObjectId, ref: 'Vigneron' },

=======
    IdVigneron: { type: mongoose.Schema.Types.ObjectId, ref: 'vignerons' },
>>>>>>> 399ff2369a96b86848e4af3c2043dec4ffc651e8
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
