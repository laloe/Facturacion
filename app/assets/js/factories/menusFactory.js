angular
	.module('app')
	.factory('menuFactory', menuFactory);

function menuFactory() {
	var factory = {};
	var menu = false;

	factory.getMenu = function() {
		return menu;
	}

	factory.setMenu = function(value) {
		menu = value;
	}


	return factory;
}
