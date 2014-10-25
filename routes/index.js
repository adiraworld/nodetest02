var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	
	var data = {
	    title: "express:",
	    table: [
	        {filename: "파일명", type: "파일형식", URL: "Google Short URL"}
	    ]
	};
	
	res.render('index', data);
});

module.exports = router;
