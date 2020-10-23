var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var BouteilleModel = require('./models/Bouteille');
var CavisteModel = require('./models/Caviste');
var VigneronModel = require('./models/Vigneron');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/sign-up', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/sign-in', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
