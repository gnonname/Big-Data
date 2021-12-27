const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create batails schema & model
const BatailleSchema = new Schema({
    codeBataille: {
        type: String,
    },
    lieu: {
        type: String,
    },
    dateDebut: {
        type: String,
    },
    dateFin: {
        type: String,
    }
});


const Bataille = mongoose.model('Bataille', BatailleSchema);

module.exports = Bataille;