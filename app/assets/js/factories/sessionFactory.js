angular
	.module('app')
	.factory('sessionFactory', sessionFactory);

function sessionFactory($state, menuFactory, $rootScope) {
	var factory = {};

	factory.getToken = function() {
		var token = sessionStorage.getItem('token');
		return token;
	}

	factory.getFirstToken = function() {
		var token = sessionStorage.getItem('token1');
		return token;
	}

	factory.setToken = function(token, usuario, sucursal, maquina, id, token1) {
		sessionStorage.setItem('token', token);
		sessionStorage.setItem('usuario', usuario);
		sessionStorage.setItem('sucursal', sucursal);
		sessionStorage.setItem('maquina', maquina);
		sessionStorage.setItem('idUsuario', id);
		sessionStorage.setItem('token1', token1);
	}

	factory.setDatosCaja = function(descripcion, nombreCaja, nombreDistribuidor, nombreSucursal) {
		sessionStorage.setItem('descripcion', descripcion);
		sessionStorage.setItem('nombreCaja', nombreCaja);
		sessionStorage.setItem('nombreDistribuidor', nombreDistribuidor);
		sessionStorage.setItem('nombreSucursal', nombreSucursal);
	}

	factory.getUser = function() {
		var user = {};
		user.usuario = sessionStorage.getItem('usuario');
		user.sucursal = sessionStorage.getItem('sucursal');
		user.maquina = sessionStorage.getItem('maquina');
		user.idUsuario = sessionStorage.getItem('idUsuario');
		return user;
	}

	factory.deleteAll = function() {
		sessionStorage.clear();
		menuFactory.setMenu(false);
		$rootScope.$emit("getMenus", {});
		$state.go('dashboard');
	}


	return factory;
}
