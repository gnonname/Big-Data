const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create promu schema & model
const PromuSchema = new Schema({
    codeGrade: {
        type: String,
    },
    codeSoldat: {
        type: String,
    },
    datePromotion: {
        type: String,
    }
});


const Promu = mongoose.model('Promu', PromuSchema);

module.exports = Promu;