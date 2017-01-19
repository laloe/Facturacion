function arqueoFactory($http, $q, GlobalService, sessionFactory) {
	var factory = {};
	var paths = {
		getCajeros: "/MuestraCajerosProcesos/GetMuestraCajerosArqueoList",
		reporteArqueo: "/T1RepArqueo/GetT1RepArqueoList"
	};


	factory.getCajeros = function(plaza) {
		var deferred = $q.defer();
		var user = sessionFactory.getUser();
		var Parametros = {
			"IdUsuario": user.idUsuario,
			"IdPlaza": plaza
		};
		var config = {
			headers: {
				'Authorization': sessionFactory.getToken()
			}
		};
		$http.post(GlobalService.getUrl() + paths.getCajeros, JSON.stringify(Parametros), config).success(function(data) {
			deferred.resolve(data);
		}).error(function(data) {
			deferred.reject(data);
		});

		return deferred.promise;
	}

	factory.reporteArqueo = function(fecha, usuario) {
		var deferred = $q.defer();
		var Parametros = {
			"Fecha": fecha,
			"ClvUsuario": usuario,
			"Id": 0
		};
		var config = {
			headers: {
				'Authorization': sessionFactory.getToken()
			}
		};
		$http.post(GlobalService.getUrl() + paths.reporteArqueo, JSON.stringify(Parametros), config).success(function(data) {
			deferred.resolve(data);
		}).error(function(data) {
			deferred.reject(data);
		});

		return deferred.promise;
	}


	return factory;
}


angular
	.module('app')
	.factory('arqueoFactory', arqueoFactory);
