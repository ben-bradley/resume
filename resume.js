var express = require('express'),
		fs = require('fs');

var app = express();

// config object for the app
var config = {
	port: 8080
};

// global for the list of resumes
var resumes = [];

app.configure(function() {
	
	// return the basic ui
	app.use('/', express.static(__dirname+'/ui'));
	
	// return an array of resumes
	app.get('/api/resumes', function(req, res) {
		res.send(resumes);
	});
	
	// return a specific resume
	app.get('/api/resumes/:person', function(req, res) {
		resumes.forEach(function(resume) {
			if (resume.name == req.params.person)
				res.send(resume);
		});
	});
	
});

// read the resumes and start the server
fs.readdir(__dirname+'/resumes', function(err, files) {
	files.forEach(function(file) {
		try {
			var resume = require(__dirname+'/resumes/'+file);
			resume._file = __dirname+'/resumes/'+file;
			resumes.push(resume);
		}
		catch(err) {
			console.error('Can\'t import file: '+__dirname+file);
		}
	});
	app.listen(config.port);
	console.log('App started, check it out: http://localhost:8080/');
});