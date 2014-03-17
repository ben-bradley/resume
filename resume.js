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
	
	read: function(callback) {
		// read the resumes and start the server
		fs.readdir(__dirname+'/resumes', function(err, files) {
			files.forEach(function(file) {
				try {
					resume = JSON.parse(fs.readFileSync(__dirname+'/resumes/'+file));
					if (!resume._file)
						resume._file = __dirname+'/resumes/'+file;
					if (!resume._gravatarUrl)
						resume._gravatarUrl = 'http://www.gravatar.com/avatar/'+md5sum.update(resume.email).digest('hex');
					resumes.list.push(resume);
				}
				catch(err) {
					console.error('Can\'t import file: '+__dirname+file);
				}
			});
			callback();
		});
	},
	
	update: function(data, res) {
		console.log('update:',data.name);
		var resume = this.get(data.name);
		for (var a in data) { resume[a] = data[a]; }
		fs.writeFile(resume._file, JSON.stringify(resume, null, 2), function(err) {
			if (err)
				res.send(err);
			else
				res.send(resume);
		});
	},
	
	// this is todo
	add: function(resume, res) {
//		console.log('add:', resume);
//		resume._file = __dirname+'/resumes/'+resume.name.replace(/ /g,'-')+'.json';
//		resume._gravatarUrl = 'http://www.gravatar.com/avatar/'+md5sum.update(resume.email).digest('hex');
//		fs.writeFile(resume._file, JSON.stringify(resume, null, 2), function(err) {
//			if (err)
//				res.send(err);
//			else
//				res.send(resume);
//		});
		res.send({ todo: 'build add route' });
	},
	
	// this is todo
	remove: function(person, res) {
		res.send({ todo: 'build remove route' });
	}
	
}

app.configure(function() {
		
	app.use(express.bodyParser());
	app.use(express.cookieParser(new Date().getTime()+''));
	app.use(express.session());
	
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
	
	// edit and return a specific resume
	app.put('/api/resumes/:person', function(req, res) {
		// validate that the person is NOT new
		var resume = resumes.get(req.params.person);
		if (resume)
			resumes.update(req.body, res);
		else
			res.send({ error: 'no resume for: '+req.params.person });
	});
	
	// TODO: build the 'save new' route
//	app.post('/api/resumes/:person', function(req, res) {
//		// validate that the person is new
//		var resume = resumes.get(req.params.person);
//		if (!resume)
//			resumes.add(req.body, res);
//		else
//			resumes.update(req.body, res);
//	});
	
//	// TODO: build the 'delete' route
//	app.delete('/api/resumes/:person', function(req, res) {
//		resumes.remove(req.params.person, res);
//	});
	
});

resumes.read(function() {
	app.listen(config.port);
	console.log('App started, check it out: http://localhost:8080/');
});