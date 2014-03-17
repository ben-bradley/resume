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
		
		events: {
			'click .uk-icon-edit': 'editClicked',
			'click .uk-icon-save': 'saveClicked'
		},
		
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
			$('.my-edit').hide();
		},
		
		editClicked: function(ev) {
			var $el = $(ev.currentTarget),
					target = $el.attr('data-target'),
					$target = $(target);
			$target.toggle();
		},
		
		saveClicked: function(ev) {
			var $el = $(ev.currentTarget),
					target = $el.attr('data-target'),
					$target = $(target),
					$textArea = $($el.attr('data-save'));
			
			// very basic input validation
			try {
				var json = JSON.parse($textArea.val());
			}
			catch (err) {
				return $textArea.addClass('uk-text-danger');
			}
			
			// remove the danger class if it has been applied
			$textArea.removeClass('uk-text-danger');
			
			// update the model on the client side
			this.model.set($textArea.attr('id'), json);
			
			// optimistically update the model on the server side
			this.model.save();
			
			// redraw the UI
			this.render();
			
		}
		
	});
	
	return ResumeView;
});