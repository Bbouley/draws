var express = require('express');
var router = express.Router();
var mongoose = require('mongoose-q')(require('mongoose'));
var Draw = require('../models/draws.js');

router.get('/', function(req, res, next) {
    Draw.find({}, function(err, draws) {
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

module.exports = router;
