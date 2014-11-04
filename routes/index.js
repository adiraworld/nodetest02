var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var config = require('../config');

function renderImageList(res, data){
	
	var connection = mysql.createConnection(config.mysql);
	
	var query_select = 'SELECT * FROM ImageList ORDER by IdImage DESC';
	
	connection.query(query_select, function(err, rows, fields) {
		if (err) return;
		
		rows.forEach(function(value){
			
			var ImageInfo = new Object();
			
			ImageInfo.filename = value.Filename;
			ImageInfo.type = value.ImgType;
			ImageInfo.URL = '<a href="' + value.ShortURL + '">' + value.ShortURL + '</a>';
			//ImageInfo.URL = value.ShortURL;
			
			data.table.push(ImageInfo);
		});
		
		res.render('index', data);
	});
	
	connection.end();
	

}

/* GET home page. */
router.get('/', function(req, res) {
	
	var data = {
	    title: "express:",
	    table: [
	        {filename: "파일명", type: "파일형식", URL: "Google Short URL"}
	    ]
	};
	
	renderImageList(res, data);
	
	//res.render('index', data);
});




module.exports = router;
