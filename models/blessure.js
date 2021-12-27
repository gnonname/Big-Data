const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create blessure schema & model
const BlessureSchema = new Schema({
    codeBlessure: {
        type: String,
    },
    typeBlessure: {
        type: String,
    }
});


const Blessure = mongoose.model('Blessure', BlessureSchema);

module.exports = Blessure;