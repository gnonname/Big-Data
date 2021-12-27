const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create grade schema & model
const GradeSchema = new Schema({
    codeGrade: {
        type: String,
    },
    intituleGrade: {
        type: String,
    }
});


const Grade = mongoose.model('Grade', GradeSchema);

module.exports = Grade;