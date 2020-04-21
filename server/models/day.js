const mongoose = require('mongoose');

const DaySchema = mongoose.Schema({
    date : {type : Date, unique : true},
    country : String,
    zone : String,
    city : String
});

module.exports = mongoose.model('Day', DaySchema);
