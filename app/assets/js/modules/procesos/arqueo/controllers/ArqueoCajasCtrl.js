function ArqueoCajasCtrl(GlobalService, $state, sessionFactory, $rootScope, ngNotify, menuFactory, entregasFactory, arqueoFactory, $filter) {
	var vm = this;
	vm.changePlaza = changePlaza;
	vm.generarArqueo = generarArqueo;
	vm.showReporte = false;
	initialData();

	function initialData() {
		var token = sessionFactory.getToken();
		if (token == null) {
			$state.go('dashboard');
		} else {
			menuFactory.setMenu(true);
			$rootScope.$emit("getMenus", {});
		}
		entregasFactory.getPlazas().then(function(data) {
			data.GetMuestraPlazasProcesosListResult.unshift({
				"razon_social": "----------------",
				"id_compania": 0
			});
			vm.plazas = data.GetMuestraPlazasProcesosListResult;
			vm.selectedPlaza = data.GetMuestraPlazasProcesosListResult[0];
		});
	}

	function changePlaza() {
		arqueoFactory.getCajeros(vm.selectedPlaza.id_compania).then(function(data) {
			data.GetMuestraCajerosArqueoListResult.unshift({
				"Nombre": "----------------",
				"Clv_Usuario": 0
			});
			vm.cajeros = data.GetMuestraCajerosArqueoListResult;
			vm.selectedCajero = data.GetMuestraCajerosArqueoListResult[0];
		});
	}

	function generarArqueo() {
		if (vm.selectedPlaza.id_compania == 0) {
			ngNotify.set('Por favor selecciona una plaza válida.', 'error');
		} else {
			if (vm.selectedCajero.Clv_Usuario == 0) {
				ngNotify.set('Por favor selecciona un cajero válido.', 'error');
			} else {
				if (vm.fecha == "" || vm.fecha == undefined) {
					ngNotify.set('Por favor selecciona un fecha válida.', 'error');
				} else {
					vm.auxFecha = $filter('date')(vm.fecha, "dd/MM/yyyy");
					arqueoFactory.reporteArqueo(vm.auxFecha, vm.selectedCajero.Clv_Usuario).then(function(data) {
						if (data.GetT1RepArqueoListResult[0].Nombre == "Sin Registros") {
							ngNotify.set('No se encontraron registros.', 'error');
						} else {
							var url = GlobalService.getUrlReportes() + "/Reportes/" + data.GetT1RepArqueoListResult[0].Nombre;
							$('#reporteID').attr('src', url);
							vm.showReporte = true;
						}
					});
				}
			}
		}
	}
}


angular
	.module('app')
	.controller('ArqueoCajasCtrl', ArqueoCajasCtrl);
