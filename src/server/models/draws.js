var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Draw = new Schema({
    gameType: String,
    date : String,
    cashValue : String,
    totalRecieved : String,
    cashKept : String,
    stocks : String,
    bonds : String,
    bondsDailyReceived : String,
    bondsMonthlyReceived : String
});

module.exports = mongoose.model('draws', Draw);
