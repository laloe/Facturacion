function entregasFactory($http, $q, GlobalService, sessionFactory) {
	var factory = {};
	var paths = {
		getPlazas: "/MuestraPlazasProcesos/GetMuestraPlazasProcesosList",
		getEntregas: "/BuscaParciales/GetBuscaParcialesList",
		getSingleEntrega: "/EntregaParcial/GetDeepEntregaParcial",
		getCajeros: "/MuestraCajerosProcesos/GetMuestraCajerosProcesosList",
		guardarEntrega: "/EntregaParcial/GetEntregaParcialList",
		editarEntrada: "/EntregaParcial/UpdateEntregaParcial",
		eliminarEntrega: "/EntregaParcial/DeleteEntregaParcial",
		buscarEntrada: "/BuscaParciales/GetBuscaParcialesList",
	};

	factory.getPlazas = function() {
		var deferred = $q.defer();
		var user = sessionFactory.getUser();
		var Parametros = {
			"IdUsuario": user.idUsuario
		};
		var config = {
			headers: {
				'Authorization': sessionFactory.getToken()
			}
		};
		$http.post(GlobalService.getUrl() + paths.getPlazas, JSON.stringify(Parametros), config).success(function(data) {
			deferred.resolve(data);
		}).error(function(data) {
			deferred.reject(data);
		});

		return deferred.promise;
	}

	factory.buscarEntrada = function(objEntrega) {
		var deferred = $q.defer();
		var user = sessionFactory.getUser();
		var Parametros = {
			"IdUsuario": user.idUsuario,
			"Op": objEntrega.op,
			"Referencia": objEntrega.referencia,
			"NomCajera": objEntrega.cajera,
			"Fecha": objEntrega.fecha,
			"IdCompania": objEntrega.IdCompania

		};
		var config = {
			headers: {
				'Authorization': sessionFactory.getToken()
			}
		};
		$http.post(GlobalService.getUrl() + paths.buscarEntrada, JSON.stringify(Parametros), config).success(function(data) {
			deferred.resolve(data);
		}).error(function(data) {
			deferred.reject(data);
		});

		return deferred.promise;
	}

	factory.getEntregas = function(IdCompania) {
		var deferred = $q.defer();
		var user = sessionFactory.getUser();
		var Parametros = {
			"IdUsuario": user.idUsuario,
			"Op": 0,
			"Referencia": "",
			"NomCajera": "",
			"Fecha": "",
			"IdCompania": IdCompania

		};
		var config = {
			headers: {
				'Authorization': sessionFactory.getToken()
			}
		};
		$http.post(GlobalService.getUrl() + paths.getEntregas, JSON.stringify(Parametros), config).success(function(data) {
			deferred.resolve(data);
		}).error(function(data) {
			deferred.reject(data);
		});

		return deferred.promise;
	}

	factory.getSingleEntrega = function(Consecutivo) {
		var deferred = $q.defer();
		var Parametros = {
			"Consecutivo": Consecutivo,
		};
		var config = {
			headers: {
				'Authorization': sessionFactory.getToken()
			}
		};
		$http.post(GlobalService.getUrl() + paths.getSingleEntrega, JSON.stringify(Parametros), config).success(function(data) {
			deferred.resolve(data);
		}).error(function(data) {
			deferred.reject(data);
		});

		return deferred.promise;
	}

	factory.getCajeros = function() {
		var deferred = $q.defer();
		var user = sessionFactory.getUser();
		var Parametros = {
			"IdUsuario": user.idUsuario
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

	factory.guardarEntrega = function(objEntrega) {
		var deferred = $q.defer();
		var user = sessionFactory.getUser();
		var Parametros = {
			"Cajera": user.usuario,
			"Importe": objEntrega.Importe,
			"NumeroCepsa": " ",
			"Recibio": objEntrega.Recibio,
			"B1000": objEntrega.B1000,
			"B500": objEntrega.B500,
			"B200": objEntrega.B200,
			"B100": objEntrega.B100,
			"B50": objEntrega.B50,
			"B20": objEntrega.B20,
			"M100": objEntrega.M100,
			"M50": objEntrega.M50,
			"M20": objEntrega.M20,
			"M10": objEntrega.M10,
			"M5": objEntrega.M5,
			"M2": objEntrega.M2,
			"M1": objEntrega.M1,
			"M050": objEntrega.M050,
			"M020": objEntrega.M020,
			"M010": objEntrega.M010,
			"M005": objEntrega.M005,
			"cheques": 0.0,
			"tarjeta": 0,
			"Referencia": objEntrega.Referencia
		};
		var config = {
			headers: {
				'Authorization': sessionFactory.getToken()
			}
		};
		$http.post(GlobalService.getUrl() + paths.guardarEntrega, JSON.stringify(Parametros), config).success(function(data) {
			deferred.resolve(data);
		}).error(function(data) {
			deferred.reject(data);
		});

		return deferred.promise;
	}

	factory.editarEntrada = function(objEntrega) {
		var deferred = $q.defer();
		var user = sessionFactory.getUser();
		var Parametros = {
			"objEntregaParcial": {
				"Cajera": user.usuario,
				"Consecutivo": objEntrega.Consecutivo,
				"Importe": objEntrega.Total,
				"NumeroCepsa": "",
				"Recibio": "",
				"B1000": objEntrega.B1000,
				"B500": objEntrega.B500,
				"B200": objEntrega.B200,
				"B100": objEntrega.B100,
				"B50": objEntrega.B50,
				"B20": objEntrega.B20,
				"M100": objEntrega.M100,
				"M50": objEntrega.M50,
				"M20": objEntrega.M20,
				"M10": objEntrega.M10,
				"M5": objEntrega.M5,
				"M2": objEntrega.M2,
				"M1": objEntrega.M1,
				"M050": objEntrega.M050,
				"M020": objEntrega.M020,
				"M010": objEntrega.M010,
				"M005": objEntrega.M005,
				"cheques": 0.0,
				"tarjeta": 0,
				"Referencia": objEntrega.Referencia
			}
		};
		var config = {
			headers: {
				'Authorization': sessionFactory.getToken()
			}
		};
		$http.post(GlobalService.getUrl() + paths.editarEntrada, JSON.stringify(Parametros), config).success(function(data) {
			deferred.resolve(data);
		}).error(function(data) {
			deferred.reject(data);
		});

		return deferred.promise;
	}

	factory.eliminarEntrega = function(Consecutivo) {
		var deferred = $q.defer();
		var Parametros = {
			"Consecutivo": Consecutivo,
		};
		var config = {
			headers: {
				'Authorization': sessionFactory.getToken()
			}
		};
		$http.post(GlobalService.getUrl() + paths.eliminarEntrega, JSON.stringify(Parametros), config).success(function(data) {
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
	.factory('entregasFactory', entregasFactory);
