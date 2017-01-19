angular
	.module('app')
	.factory('ventasFactory', ventasFactory);


function ventasFactory($http, $q, GlobalService, sessionFactory) {
	var factory = {};
	var paths = {
		buscarContrato: "/BusCliPorContrato_Fac/GetBusCliPorContrato_FacList",
		informacion: "/InformacionClientePeriodos/GetInformacionClientePeriodosList",
		clabe: "/BotonClabe/GetBotonClabeList",
		serviciosCliente: "/DameSerDelCliFac/GetDameSerDelCliFacList",
		dameSession: "/DameClv_Session/GetDeepDameClv_Session",
		dameDetallePago: "/DameDetalle/GetDameDetalleList",
		dameSumaPago: "/SumaDetalle/GetSumaDetalleList"
	};

	factory.buscarContrato = function(contrato) {
		var deferred = $q.defer();
		var Parametros = {
			"Id": 0,
			"ContratoC": contrato
		};
		var config = {
			headers: {
				'Authorization': sessionFactory.getToken()
			}
		};
		$http.post(GlobalService.getUrl() + paths.buscarContrato, JSON.stringify(Parametros), config).success(function(data) {
			deferred.resolve(data);
		}).error(function(data) {
			deferred.reject(data);
		});

		return deferred.promise;
	}

	factory.informacion = function(contrato) {
		var deferred = $q.defer();
		var Parametros = {
			"Contrato": contrato
		};
		var config = {
			headers: {
				'Authorization': sessionFactory.getToken()
			}
		};
		$http.post(GlobalService.getUrl() + paths.informacion, JSON.stringify(Parametros), config).success(function(data) {
			deferred.resolve(data);
		}).error(function(data) {
			deferred.reject(data);
		});

		return deferred.promise;
	}

	factory.clabe = function(contrato) {
		var deferred = $q.defer();
		var Parametros = {
			"Contrato": contrato
		};
		var config = {
			headers: {
				'Authorization': sessionFactory.getToken()
			}
		};
		$http.post(GlobalService.getUrl() + paths.cable, JSON.stringify(Parametros), config).success(function(data) {
			deferred.resolve(data);
		}).error(function(data) {
			deferred.reject(data);
		});

		return deferred.promise;
	}

	factory.serviciosCliente = function(contrato) {
		var deferred = $q.defer();
		var Parametros = {
			"Contrato": contrato
		};
		var config = {
			headers: {
				'Authorization': sessionFactory.getToken()
			}
		};
		$http.post(GlobalService.getUrl() + paths.serviciosCliente, JSON.stringify(Parametros), config).success(function(data) {
			deferred.resolve(data);
		}).error(function(data) {
			deferred.reject(data);
		});

		return deferred.promise;
	}

	factory.dameSession = function(contrato) {
		var deferred = $q.defer();
		var Parametros = {
			"Contrato": contrato
		};
		var config = {
			headers: {
				'Authorization': sessionFactory.getToken()
			}
		};
		$http.post(GlobalService.getUrl() + paths.dameSession, JSON.stringify(Parametros), config).success(function(data) {
			deferred.resolve(data);
		}).error(function(data) {
			deferred.reject(data);
		});

		return deferred.promise;
	}

	factory.dameDetallePago = function(session) {
		var deferred = $q.defer();
		var Parametros = {
			"Clv_Session": session
		};
		var config = {
			headers: {
				'Authorization': sessionFactory.getToken()
			}
		};
		$http.post(GlobalService.getUrl() + paths.dameDetallePago, JSON.stringify(Parametros), config).success(function(data) {
			deferred.resolve(data);
		}).error(function(data) {
			deferred.reject(data);
		});

		return deferred.promise;
	}

	factory.dameSumaPago = function(session) {
		var deferred = $q.defer();
		var Parametros = {
			"Clv_Session": session
		};
		var config = {
			headers: {
				'Authorization': sessionFactory.getToken()
			}
		};
		$http.post(GlobalService.getUrl() + paths.dameSumaPago, JSON.stringify(Parametros), config).success(function(data) {
			deferred.resolve(data);
		}).error(function(data) {
			deferred.reject(data);
		});

		return deferred.promise;
	}


	return factory;
}
