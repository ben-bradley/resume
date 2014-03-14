// file: ui/js/collections/resumes.js
define([
	'jquery',
	'underscore',
	'backbone',
	'/js/models/resume.js'
], function($, _, Backbone, ResumeModel){
	var ResumesCollection = Backbone.Collection.extend({
		
		url: 'api/resumes',
		
		model: ResumeModel,
		
		empty: function() {
			while (this.models && this.models.length > 0)
				this.remove(this.models[0]);
		}
		
	});
	return ResumesCollection;
});