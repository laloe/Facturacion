angular
	.module('app')
	.controller('FacturacionLoginCtrl', FacturacionLoginCtrl);

function FacturacionLoginCtrl($stateParams, menuFactory, $rootScope, sessionFactory, $state, autorizacionFactory, ngNotify) {
	var vm = this;
	vm.initialData = initialData;

	if ($stateParams.token != "") {
		var token = sessionFactory.getToken();
		if (token != null) {
			$state.go('cajas');
		} else {
			initialData();
		}
	} else {
		var token = sessionFactory.getToken();
		if (token != null) {
			$state.go('cajas');
		} else {
			vm.mensaje = '¡Token de autorización invalido por favor contacta al administrador del sistema!';
		}
	}


	function initialData() {
		autorizacionFactory.getAuth($stateParams.token).then(function(data) {
			if (data.GetDameSessionWListResult[0].Codigo != "") {
				sessionFactory.setToken(data.GetDameSessionWListResult[0].Codigo, data.GetDameSessionWListResult[0].Usuario, data.GetDameSessionWListResult[0].IdSucursal, data.GetDameSessionWListResult[0].IpMaquina, data.GetDameSessionWListResult[0].IdUsuario, $stateParams.token);
				autorizacionFactory.dameDatosCaja().then(function(caja) {
					sessionFactory.setDatosCaja(caja.GetDameDatosUpListResult[0].Descripcion, caja.GetDameDatosUpListResult[0].NombreC, caja.GetDameDatosUpListResult[0].NombreD, caja.GetDameDatosUpListResult[0].NombreS);
				});
				menuFactory.setMenu(true);
				$rootScope.$emit("getMenus", {});
				$state.go('cajas');
			} else {
				ngNotify.set('Token de acceso invalido.', 'error');
				vm.mensaje = '¡Token de autorización invalido por favor contacta al administrador del sistema!';
			}
		});
	}
}
