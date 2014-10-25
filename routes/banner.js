var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	  res.render('index', { title: 'Express' });
	  console.log('banner.js');
	});

router.get('/:id', function(req, res) {
  res.render('index', { title: 'Express' });
  console.log('banner.js: ' + req.param('id'));
});

module.exports = router;