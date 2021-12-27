const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create soldat schema & model
const SoldatSchema = new Schema({
    codeSoldat: {
        type: String,
    },
    nomSoldat: {
        type: String,
    },
    prenomSoldat: {
        type: String,
    },
    dateNaissance: {
        type: String,
    },
    dateDeces: {
        type: String,
    }
});


const Soldat = mongoose.model('Soldat', SoldatSchema);

module.exports = Soldat;