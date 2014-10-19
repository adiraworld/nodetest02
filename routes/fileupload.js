/**
 * New node file
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');



/* GET home page. */
router.get('/', function(req, res) {
	console.log("FileUpload.js Start");

	// bodyParser 없을 경우 req.files 에러 발생.
	fs.readFile(req.files.uploadFile.path, function (error, data) { 
		
			// 저장할 파일 경로를 지정 합니다.
			var filePath = __dirname + "\\files\\" + req.files.uploadFile.name;
			// 파일 저장 및 에러처리
			fs.writeFile(filePath, data, function (error) { 
			if (error) {
				console.log(error);
			} else {
				//res.redirect("back");
				res.render('fileupload', { title: 'File Upload' });
			}
		});
	});

	
});

module.exports = router;



	
