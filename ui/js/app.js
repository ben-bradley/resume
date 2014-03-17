// Filename: app.js
define([
	'jquery', 'underscore', 'backbone', 'router', // libs
	'uikit', // UIKit stuff
	'collections/resumes',
	'views/resumes', 'views/resume'
], function(
	$, _, Backbone, Router,// libs
	UIKit, // UIKit stuff
	ResumesCollection,
	ResumesView, ResumeView
) {
	
	var initialize = function() {
		
		// This reads the resumes that are stored on the file system in JSON format
		var resumesCollection = new ResumesCollection();
		
		// The resumes view shows the list of resumes on file in the left side of the UI.
		// It's triggered by the 'sync' event on the collection.
		var resumesView = new ResumesView({ collection: resumesCollection });
		
		resumesCollection.fetch();
		
		// I like to have all the routes visible in the app.js file for easy reference so
		// I pass through the configuration of the router from router.js to app.js
		var routes = {
			'resume/:person'				: 'showResume',
			'resume/:person/:json'	: 'showResume'
		};
		
		var router = new Router({ routes: routes });
		
		router.on('route:showResume', function(person, json) {
			var resumeModel = resumesCollection.get(person),
					json = (json === 'json');
			if (resumeModel)
				var resumeView = new ResumeView({ model: resumesCollection.get(person), showJson: json });
			else
				router.navigate('/');
		});
		
		Backbone.history.start();
		
		// this function will cause each DOM element with a 'data-fill-height' attribute to be set to
		// fill the remaining height based on it's current .top value.  I find this helpful when building
		// one page apps and you want the DOM element to fit the screen.
		var fillHeight = function() {
			var h = $(window).innerHeight();
			$('[data-fill-height').each(function() {
				var $this = $(this),
						top = $this.offset().top;
				$this.css({
					'max-height': h-top,
					'height': h-top,
					'overflow-y': 'auto'
				});
			});
		};
		
		fillHeight();
		
	};

	return {
		initialize: initialize
	};
});