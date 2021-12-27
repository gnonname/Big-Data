const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

db.affecte = require("./affecte.js")(mongoose);
db.bataille = require("./bataille.js")(mongoose);
db.blesse = require("./blesse.js")(mongoose);
db.blessure = require("./blessure.js")(mongoose);
db.grade = require("./grade.js")(mongoose);
db.promu = require("./promu.js")(mongoose);
db.soldat = require("./soldat.js")(mongoose);
db.unite = require("./unite.js")(mongoose);

module.exports = db;