var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	
	var data = {
	    title: "express:",
	    table: [
	        {filename: "Ted", type: "jpg", URL: "goo.gl/image01.jpg"},
	        {filename: "Bob", type: "jpg", URL: "goo.gl/image02.jpg"}
	    ]
	};
	
	res.render('index', data);
});

module.exports = router;
