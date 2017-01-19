angular
	.module('app')
	.controller('homeCtrl', homeCtrl);

function homeCtrl($rootScope, menuFactory, sessionFactory, $timeout, $state) {
	var vm = this;
	vm.logOut = logOut;
	getMenuStates();



	$rootScope.$on("getMenus", function() {
		getMenuStates();
	});

	function getMenuStates() {
		vm.showMenus = menuFactory.getMenu();
		var usuario = sessionFactory.getUser();
		vm.usuario = usuario.usuario;
		vm.sucursal = usuario.sucursal;
		vm.maquina = usuario.maquina;
	}

	function logOut() {
		delete $localStorage.currentUser;
		$http.defaults.headers.common.Authorization = '';
		menuFactory.setMenu(false);
		$rootScope.$emit("getMenus", {});
		$state.go('dashboard');
	}

	$timeout(function() {
		$('#menuMostrarData').removeAttr('style');
		vm.mostrarLoad = false;
	});

}
