// file: ui/js/views/resumes.js
define([
	'jquery',
	'underscore',
	'backbone',
	'text!/templates/resumes.html'
], function($, _, Backbone, resumesHtml){
	
	var ResumesView = Backbone.View.extend({
		
		el: $('#resumes'),
		
		initialize: function() {
			this.collection.on('sync', this.render, this);
		},
		
		render: function() {
			var data = { resumes: this.collection.toJSON() };
			var compiledTemplate = _.template(resumesHtml, data);
			this.$el.empty();
			this.$el.html(compiledTemplate);
		}
		
	});
	
	return ResumesView;
});