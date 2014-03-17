// file: ui/js/views/resume.js
define([
	'jquery',
	'underscore',
	'backbone',
	'text!/templates/resume.html',
	'text!/templates/resume_json.html'
], function($, _, Backbone, resumeHtml, resumeJsonHtml){
	
	var ResumeView = Backbone.View.extend({
		
		el: $('#resume'),
		
		initialize: function(options) {
			this.showJson = options.showJson;
			this.render();
		},
		
		render: function() {
			var data = { resume: this.model.toJSON() };
			var template = (this.showJson) ? resumeJsonHtml : resumeHtml;
			var compiledTemplate = _.template(template, data);
			this.$el.empty();
			this.$el.html(compiledTemplate);
		}
		
	});
	
	return ResumeView;
});