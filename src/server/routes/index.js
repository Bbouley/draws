var express = require('express');
var router = express.Router();
var mongoose = require('mongoose-q')(require('mongoose'));
var Draw = require('../models/draws.js');

router.get('/', function(req, res, next) {
    Draw.find({}, function(err, draws) {
        var sortedDraws = sortObjectsByDate(draws);
        // console.log(sortedDraws);
        res.render('index', { title: 'Lottery Draws', draws : sortedDraws});
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
    function compare(a,b) {
        if (new Date(a.date).getTime() < new Date(b.date).getTime())
            return -1;
        if (new Date(a.date).getTime() > new Date(b.date).getTime())
            return 1;
        return 0;
    }

    arrayOfLottery.sort(compare).reverse();
    console.log(arrayOfLottery);
    return arrayOfLottery;
}

module.exports = router;
