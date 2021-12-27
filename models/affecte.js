const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create affecte schema & model
const AffecteSchema = new Schema({
    codeUnite: {
        type: String,
    },
    codeSoldat: {
        type: String,
    },
    dateAffectation: {
        type: String,
    }
});


const Affecte = mongoose.model('Affecte', AffecteSchema);

module.exports = Affecte;