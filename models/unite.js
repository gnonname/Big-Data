const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create unite schema & model
const UniteSchema = new Schema({
    codeUnite: {
        type: String,
    },
    nomUnite: {
        type: String,
    }
});


const Unite = mongoose.model('Unite', UniteSchema);

module.exports = Unite;