// file: ui/js/views/resume.js
define([
	'jquery',
	'underscore',
	'backbone',
	'text!/templates/resume.html'
], function($, _, Backbone, resumeHtml){
	
	var ResumeView = Backbone.View.extend({
		
		el: $('#resume'),
		
		initialize: function() {
			this.render();
		},
		
		render: function() {
			var data = { resume: this.model.toJSON() };
			var compiledTemplate = _.template(resumeHtml, data);
			this.$el.empty();
			this.$el.html(compiledTemplate);
		}
		
	});
	
	return ResumeView;
});