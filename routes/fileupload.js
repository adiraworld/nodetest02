/**
 * New node file
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');
var mysql = require('mysql');
var moment = require('moment');
var path = require('path');

router.post('/', function (req, res) {
	var fstream;
	req.pipe(req.busboy);
	req.busboy.on('file', function (fieldname, file, filename){
		console.log("Uploading: " + filename);
		
		// extract file extname & create image filename
		var newImagefilename = moment().format() + path.extname(filename);
		
		//Path where image will be uploaded
       // fstream = fs.createWriteStream(__dirname + '/img/' + filename);
		fstream = fs.createWriteStream('..' + '/img/' + newImagefilename);
        file.pipe(fstream);
        fstream.on('close', function () {    
            console.log("Upload Finished of " + newImagefilename);              
            res.redirect('..');           //where to go next
        });
	});
	
	console.log(req.files); 
	//res.send('ok'); 
});

function InsertImagePathIntoMysql(path, filetype){

	var connection = mysql.createConnection({
		  host     : 'localhost',
		  user     : 'root',
		  password : 'infra7525',
		  database : 'fileupload'
		});
	
	var query = 'INSERT INTO ImageList (Filename, ImgType, ShortURL) VALUES (?, ?, ?)';

	connection.query(query, [path, filetype, 'google short'], function(err, results){
		if(null != err)
			console.log('mysql error: ' + err);
		console.log('mysql result: ' + results);
	});

}

module.exports = router;



	
