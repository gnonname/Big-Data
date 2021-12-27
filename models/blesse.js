const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create blesse schema & model
const BlesseSchema = new Schema({
    codeSoldat: {
        type: String,
    },
    codeBataille: {
        type: String,
    },
    codeBlessure: {
        type: String,
    },
    dateBlessure: {
        type: String,
    }
});


const Blesse = mongoose.model('Blesse', BlesseSchema);

module.exports = Blesse;