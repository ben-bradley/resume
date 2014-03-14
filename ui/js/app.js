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
		
		var resumesCollection = new ResumesCollection();
		
		var resumesView = new ResumesView({ collection: resumesCollection });
		
		resumesCollection.fetch();
		
		var routes = {
			'resume/:person': 'showResume'
		};
		
		var router = new Router({ routes: routes });
		
		router.on('route:showResume', function(person) {
			var resumeModel = resumesCollection.get(person);
			if (resumeModel)
				var resumeView = new ResumeView({ model: resumesCollection.get(person) });
			else
				router.navigate('/');
		});
		
		Backbone.history.start();
		
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