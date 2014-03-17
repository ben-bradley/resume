var express = require('express'),
		http = require('http'),
		crypto = require('crypto'),
		fs = require('fs');

var app = express();

// config object for the app
var config = {
	port: 8080
};

// gravatar uses a md5 hashed email address for avatar reference
var md5sum = crypto.createHash('md5');

// global for the list of resumes
var resumes = {
	
	list: [],
	
	get: function(id) {
		var got = undefined;
		this.list.forEach(function(resume) {
			if (resume.name == id)
				got = resume;
		});
		return got;
	},
	
	add: function(data, res) {
		
	},
	
	update: function(data, res) {
		
	},
	
	remove: function(data, res) {
		
	}
	
}

app.configure(function() {
	
	// return the static elements of the ui
	app.use('/', express.static(__dirname+'/ui'));
	
	// return an array of resumes
	app.get('/api/resumes', function(req, res) {
		res.send(resumes.list);
	});
	
	// return a specific resume
	app.get('/api/resumes/:person', function(req, res) {
		res.send(resumes.get(req.params.person));
	});
	
	// TODO: build the 'save new' route
	app.post('/api/resumes/:person', function(req, res) {
		// validate that the person is new
		var resume = resumes.get(req.params.person);
		if (!resume)
			resumes.add(req.body, res);
		else
			resumes.update(req.body, res);
	});
	
	// TODO: build the 'update' route
	app.put('/api/resumes/:person', function(req, res) {
		// validate that the person is NOT new
		var resume = resumes.get(req.params.person);
		if (!resume)
			resumes.add(req.body, res);
		else
			resumes.update(req.body, res);
	});
	
	// TODO: build the 'delete' route
	app.delete('/api/resumes/:person', function(req, res) {
		resumes.remove(req.params.person, res);
	});
	
});

// read the resumes and start the server
fs.readdir(__dirname+'/resumes', function(err, files) {
	files.forEach(function(file) {
		try {
			resume = JSON.parse(fs.readFileSync(__dirname+'/resumes/'+file));
			resume._file = __dirname+'/resumes/'+file;
			resume._gravatarUrl = 'http://www.gravatar.com/avatar/'+md5sum.update(resume.email).digest('hex');
			resumes.list.push(resume);
		}
		catch(err) {
			console.error('Can\'t import file: '+__dirname+file);
		}
	});
	app.listen(config.port);
	console.log('App started, check it out: http://localhost:8080/');
});