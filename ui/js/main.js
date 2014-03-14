require.config({
	paths: {
		jquery: 'lib/jquery.min',
		underscore: 'lib/underscore-amd',
		backbone: 'lib/backbone-amd',
		uikit: 'lib/uikit.min'
	},
	shim: {
		uikit: { deps: [ 'jquery' ] }
	}
});

require([
	'app',
], function(App){
	App.initialize();
});