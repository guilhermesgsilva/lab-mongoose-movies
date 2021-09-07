const mongoose = require("mongoose");

const celebritySchema = mongoose.Schema({
    name: String,
    occupation: String,
    catchPhrase: String,
},
{
    timestamps: true,
});

const Celebrity = mongoose.model("Celebrity", celebritySchema);

module.exports = Celebrity;