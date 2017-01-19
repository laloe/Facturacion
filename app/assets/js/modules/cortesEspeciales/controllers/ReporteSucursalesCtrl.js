angular
	.module('app')
	.controller('ReporteSucursalesCtrl', ReporteSucursalesCtrl);

function ReporteSucursalesCtrl($state, sessionFactory, menuFactory, $rootScope, reportesFactory, ngNotify, $filter, GlobalService) {
	var vm = this;
	vm.menuChange = menuChange;
	vm.secuenciaReporte = secuenciaReporte;
	vm.ocultarPaneles = ocultarPaneles;
	vm.okSucursales = okSucursales;
	vm.backFechaGeneral = backFechaGeneral;
	vm.generarReporte = generarReporte;
	vm.cancel = cancel;
	initialData();


	function initialData() {
		var token = sessionFactory.getToken();
		if (token == null) {
			$state.go('dashboard');
		} else {
			menuFactory.setMenu(true);
			$rootScope.$emit("getMenus", {});
		}
		var usuario = sessionFactory.getUser();
		vm.id = usuario.idUsuario;
		reportesFactory.getOptionsEspeciales().then(function(data) {
			data.GetOpcionesCortesEspecialesFacListResult.unshift({
				"Nombre": "----------------",
				"Clv_Vendedor": 999
			});
			getDatosSucursales();
			vm.selectMenu = data.GetOpcionesCortesEspecialesFacListResult;
			vm.selectedMenu = data.GetOpcionesCortesEspecialesFacListResult[0];
		});
	}

	function getDatosSucursales() {
		reportesFactory.muestraSucursalesEspeciales().then(function(data) {
			vm.sucursalesObj = {
				filterPlaceHolder: 'Buscar en los elementos sin seleccionar.',
				labelAll: 'Sucursales Disponibles',
				labelSelected: 'Sucursales Disponibles',
				labelShow: 'Nombre',
				orderProperty: 'Nombre',
				items: data.GetSucursalesEspecialesListResult,
				selectedItems: []
			};
		});
	}

	function generarReporte(reporte) {
		ocultarPaneles();
		switch (reporte) {
			case "General":
				if (vm.selectedMenu.Clv_Vendedor == 0) {
					vm.auxFechaInicio = $filter('date')(vm.fechaInicio, "dd/MM/yyyy");
					vm.auxFechaFinal = $filter('date')(vm.fechaFinal, "dd/MM/yyyy");
					if (vm.fechaInicio == undefined || vm.fechaFinal == undefined || vm.fechaInicio == '' || vm.fechaFinal == '') {
						ngNotify.set('Selecciona un rango de fechas válido.', 'error');
						vm.showGeneralDate = true;
					} else {
						if (vm.ordenarStatus == true) {
							vm.auxOrdenarStatus = 1;
						} else {
							vm.auxOrdenarStatus = 0;
						}
						var auxSuc = [];
						vm.sucursalesObj.selectedItems.forEach(function(item) {
							auxSuc.push({
								Clv_Sucursal: item.Clv_Sucursal,
								Nombre: item.Nombre
							});
						});
						var objGeneralReporte = {
							fechaInicial: vm.auxFechaInicio,
							fechaFinal: vm.auxFechaFinal,
							objsucursales: auxSuc,
							status: vm.auxOrdenarStatus
						};
						reportesFactory.reporteGeneralEspeciales(objGeneralReporte).then(function(data) {
							if (data.GetReporteCortesEspGralListResult[0].Cajera == "Sin Registros") {
								ngNotify.set('No se encontraron registros.', 'error');
							} else {
								var url = GlobalService.getUrlReportes() + "/Reportes/" + data.GetReporteCortesEspGralListResult[0].Cajera;
								$('#reporteID').attr('src', url);
								vm.showReporte = true;
							}

						});
					}
				} else if (vm.selectedMenu.Clv_Vendedor == 1) {
					vm.auxFechaInicio = $filter('date')(vm.fechaInicio, "dd/MM/yyyy");
					vm.auxFechaFinal = $filter('date')(vm.fechaFinal, "dd/MM/yyyy");
					if (vm.fechaInicio == undefined || vm.fechaFinal == undefined || vm.fechaInicio == '' || vm.fechaFinal == '') {
						ngNotify.set('Selecciona un rango de fechas válido.', 'error');
						vm.showGeneralDate = true;
					} else {
						console.log('error');
					}
				}
				break;
			case "Por Sucursal":
				if (vm.selectedMenu.Clv_Vendedor == 0) {
					vm.auxFechaInicio = $filter('date')(vm.fechaInicio, "dd/MM/yyyy");
					vm.auxFechaFinal = $filter('date')(vm.fechaFinal, "dd/MM/yyyy");
					if (vm.fechaInicio == undefined || vm.fechaFinal == undefined || vm.fechaInicio == '' || vm.fechaFinal == '') {
						ngNotify.set('No se encontraron registros.', 'error');
						vm.showGeneralDate = true;
						vm.showResumen = true;
					} else {
						if (vm.ordenarStatus == true) {
							vm.auxOrdenarStatus = 1;
						} else {
							vm.auxOrdenarStatus = 0;
						}
						if (vm.resumen == true) {
							vm.auxResumen = 1;
						} else {
							vm.auxResumen = 0;
						}
						var auxSuc = [];
						vm.sucursalesObj.selectedItems.forEach(function(item) {
							auxSuc.push({
								Clv_Sucursal: item.Clv_Sucursal,
								Nombre: item.Nombre
							});
						});
						var objGeneralReporte = {
							fechaInicial: vm.auxFechaInicio,
							fechaFinal: vm.auxFechaFinal,
							objsucursales: auxSuc,
							status: vm.auxOrdenarStatus,
							resumen: vm.auxResumen
						};
						reportesFactory.reporteSucursalEspeciales(objGeneralReporte).then(function(data) {
							if (data.GetReporteCortesEspSucListResult[0].Cajera == "Sin Registros") {
								ngNotify.set('No se encontraron registros.', 'error');
							} else {
								var url = GlobalService.getUrlReportes() + "/Reportes/" + data.GetReporteCortesEspSucListResult[0].Cajera;
								$('#reporteID').attr('src', url);
								vm.showReporte = true;
							}

						});
					}
				} else if (vm.selectedMenu.Clv_Vendedor == 1) {
					vm.auxFechaInicio = $filter('date')(vm.fechaInicio, "dd/MM/yyyy");
					vm.auxFechaFinal = $filter('date')(vm.fechaFinal, "dd/MM/yyyy");
					if (vm.fechaInicio == undefined || vm.fechaFinal == undefined || vm.fechaInicio == '' || vm.fechaFinal == '') {
						ngNotify.set('Selecciona un rango de fechas válido.', 'error');
						vm.showGeneralDate = true;
					} else {
						console.log('error');
					}
				}
				break;
			case "General de Facturas Fiscales":
				if (vm.selectedMenu.Clv_Vendedor == 0) {
					vm.auxFechaInicio = $filter('date')(vm.fechaInicio, "dd/MM/yyyy");
					vm.auxFechaFinal = $filter('date')(vm.fechaFinal, "dd/MM/yyyy");
					if (vm.fechaInicio == undefined || vm.fechaFinal == undefined || vm.fechaInicio == '' || vm.fechaFinal == '') {
						ngNotify.set('No se encontraron registros.', 'error');
						vm.showGeneralDate = true;
					} else {
						var auxSuc = [];
						vm.sucursalesObj.selectedItems.forEach(function(item) {
							auxSuc.push({
								Clv_Sucursal: item.Clv_Sucursal,
								Nombre: item.Nombre
							});
						});
						var objGeneralReporte = {
							fechaInicial: vm.auxFechaInicio,
							fechaFinal: vm.auxFechaFinal,
							objsucursales: auxSuc
						};
						reportesFactory.reporteFacturasFiscales(objGeneralReporte).then(function(data) {
							if (data.GetRepFacFisEspecialesGralListResult[0].NomCajera == "Sin Registros") {
								ngNotify.set('No se encontraron registros.', 'error');
							} else {
								var url = GlobalService.getUrlReportes() + "/Reportes/" + data.GetRepFacFisEspecialesGralListResult[0].NomCajera;
								$('#reporteID').attr('src', url);
								vm.showReporte = true;
							}
						});
					}
				} else if (vm.selectedMenu.Clv_Vendedor == 1) {
					vm.auxFechaInicio = $filter('date')(vm.fechaInicio, "dd/MM/yyyy");
					vm.auxFechaFinal = $filter('date')(vm.fechaFinal, "dd/MM/yyyy");
					if (vm.fechaInicio == undefined || vm.fechaFinal == undefined || vm.fechaInicio == '' || vm.fechaFinal == '') {
						ngNotify.set('Selecciona un rango de fechas válido.', 'error');
						vm.showGeneralDate = true;
					} else {
						console.log('error');
					}
				}
				break;
		}
	}

	function menuChange() {
		if (vm.selectedMenu.Clv_Vendedor != 999) {
			vm.showMenus = true;
			reportesFactory.getCatalogoOptionsEspeciales(vm.selectedMenu.Clv_Vendedor).then(function(data) {
				vm.subMenu = data.GetCatalogoRepCorteEspecialFacListResult;
			});
		} else {
			vm.showMenus = false;
		}

	}

	function secuenciaReporte(x) {
		vm.fechaInicio = null;
		vm.fechaFinal = null;
		vm.resumen = 0;
		getDatosSucursales();
		vm.secuencia = x;
		ocultarPaneles();
		switch (x) {
			case "General":
				vm.showGeneral = true;
				break;
			case "Por Sucursal":
				vm.showSucursales = true;
				break;
			case "General de Facturas Fiscales":
				vm.showGeneralFacturas = true;
				break;
		}
	}

	vm.ok = function() {}

	function okSucursales() {
		switch (vm.secuencia) {
			case "General":
				if (vm.sucursalesObj.selectedItems.length > 0) {
					ocultarPaneles();
					vm.showGeneralDate = true;
				} else {
					ngNotify.set('Selecciona al menos una sucursal.', 'error');
				}
				break;
			case "Por Sucursal":
				if (vm.sucursalesObj.selectedItems.length > 0) {
					ocultarPaneles();
					vm.showGeneralDate = true;
					vm.showResumen = true;
				} else {
					ngNotify.set('Selecciona al menos una sucursal.', 'error');
				}
				break;
			case "General de Facturas Fiscales":
				if (vm.sucursalesObj.selectedItems.length > 0) {
					ocultarPaneles();
					vm.showGeneralDate = true;
				} else {
					ngNotify.set('Selecciona al menos una sucursal.', 'error');
				}
				break;
		}
	}

	function backFechaGeneral() {
		switch (vm.secuencia) {
			case "General":
				vm.showGeneral = true;
				vm.showGeneralDate = false;
				break;
			case "Por Sucursal":
				vm.showSucursales = true;
				vm.showGeneralDate = false;
				break;
			case "General de Facturas Fiscales":
				vm.showGeneralFacturas = true;
				vm.showGeneralDate = false;
				break;
		}
	}

	function cancel() {
		ocultarPaneles();
	}

	function ocultarPaneles() {
		vm.showGeneral = false;
		vm.showSucursales = false;
		vm.showGeneralFacturas = false;
		vm.showGeneralDate = false;
		vm.showResumen = false;
		vm.showReporte = false;
	}
}
