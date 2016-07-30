var express = require('express');
var router = express.Router();
var mongoose = require('mongoose-q')(require('mongoose'));
var Draw = require('../models/draws.js');

router.get('/', function(req, res, next) {
    Draw.find({}, function(err, draws) {
        var draws = sortObjectsByDate(draws);
        res.render('index', { title: 'Lottery Draws', draws : draws});
    });
});

router.post('/newdraw', function(req, res, next) {
    var draw = new Draw(req.body);
    draw.saveQ()
    .then(function(result) {
        res.json(result);
    })
    .catch(function(err) {
        res.json({'ERROR' : err})
    })
});

function sortObjectsByDate (arrayOfLottery) {
    return arrayOfLottery.sort(function(a, b) {
        return a.date < b.date
    })
}

module.exports = router;
