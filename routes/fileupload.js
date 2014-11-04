/**
 * New node file
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');
var mysql = require('mysql');
var moment = require('moment');
var path = require('path');
var googl = require('goo.gl');
var config = require('../config');

var customEvent = new process.EventEmitter();

customEvent.on('Backward', function(res){
	res.redirect('..');           //where to go next
});


customEvent.on('Finish_googleShorten', function(res, Id, shortUrl){
	
	var connection = mysql.createConnection(config.mysql);

	
	var query_update = 'UPDATE ImageList SET ShortURL= ' + '"' + shortUrl + '"' + ' WHERE IdImage = ' + Id;
	
	//connection.query("UPDATE posts SET title = :title", { title: "Hello MySQL" });
	console.log('update query: ' + query_update);
	
	connection.query(query_update, function(err, results){
		if(null != err){
			console.log('update error: ' + err);
			customEvent.emit('Backward');
			connection.end();
			return;
		}	
		console.log('finish!! Id=' + Id + ', shortUrl=' + shortUrl);
		//connection.end();
		//res.redirect('..');           //where to go next
	});
	

});

customEvent.on('Finish_insertImageInfo', function(res, Id){
	
	googl.shorten('http://aws.game-turbo.co.kr/banner/' + Id)
	.then(function (shortUrl) {
	    console.log(shortUrl);	
	    customEvent.emit('Finish_googleShorten',res, Id, shortUrl);
	});

});

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
            
            InsertImagePathIntoMysql(res, newImagefilename, path.extname(filename));
            

        });
	});
	
	console.log(req.files); 
	//res.send('ok'); 
});

function InsertImagePathIntoMysql(res, Filename, filetype){

	var connection = mysql.createConnection(config.mysql);
	
	var query_insert = 'INSERT INTO ImageList (Filename, ImgType, ShortURL) VALUES (?, ?, ?)';
	var query_select = 'SELECT IdImage FROM ImageList WHERE Filename = ?';

	connection.query(query_insert, [Filename, filetype.substr(1,4), 'google short'], function(err, results){
		if(null != err){
			console.log('insert error: ' + err);
			customEvent.emit('Backward');
			connection.end();
			return;
		}
		//console.log('mysql result: ' + results);
		connection.query(query_select, Filename, function(err, rows, fields){
			if(null != err){
				console.log('select error: ' + err);
				customEvent.emit('Backward',res);
				return;
			}
			customEvent.emit('Finish_insertImageInfo', res, rows[0].IdImage);
			connection.end();
		});
	
	});

}

module.exports = router;



	
