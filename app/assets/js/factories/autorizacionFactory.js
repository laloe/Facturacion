angular
	.module('app')
	.factory('autorizacionFactory', autorizacionFactory);

function autorizacionFactory($http, $q, GlobalService, sessionFactory) {
	var factory = {};
	var paths = {
		getAutentication: "/DameSessionW/GetDameSessionWList",
		dameDatosCaja: "/DameDatosUp/GetDameDatosUpList"
	}

	factory.getAuth = function(token) {
		var deferred = $q.defer();
		var Parametros = {
			"Id": 0,
			"Codigo": token
		};
		var config = {
			headers: {
				'Authorization': token
			}
		};
		$http.post(GlobalService.getUrl() + paths.getAutentication, JSON.stringify(Parametros), config).success(function(data) {
			deferred.resolve(data);
		}).error(function(data) {
			deferred.reject(data);
		});

		return deferred.promise;
	};

	factory.dameDatosCaja = function() {
		var deferred = $q.defer();
		var user = sessionFactory.getUser();
		var Parametros = {
			"Clave": user.idUsuario,
			"Clv_Usuario": user.usuario,
			"Clv_Sucursal": user.sucursal,
			"IpMaquina": user.maquina
		};
		var config = {
			headers: {
				'Authorization': sessionFactory.getToken()
			}
		};
		$http.post(GlobalService.getUrl() + paths.dameDatosCaja, JSON.stringify(Parametros), config).success(function(data) {
			deferred.resolve(data);
		}).error(function(data) {
			deferred.reject(data);
		});

		return deferred.promise;
	};


	return factory;
}
