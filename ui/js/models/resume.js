// file: ui/js/models/resume.js
define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone) {
	var ResumeModel = Backbone.Model.extend({
		
		idAttribute: 'name',
		
		initialize: function() {}
		
	});
	
	return ResumeModel;
});