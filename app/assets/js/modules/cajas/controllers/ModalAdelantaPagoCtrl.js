angular
	.module('app')
	.controller('ModalAdelantaPagoCtrl', ModalAdelantaPagoCtrl);

function ModalAdelantaPagoCtrl($uibModalInstance, cajasFactory, items, $rootScope) {
	var vm = this;
	vm.cancel = cancel;
	vm.mesesPagar = 1;
	vm.mesesChange = mesesChange;
	vm.ok = ok;


	function mesesChange() {
		if (vm.mesesPagar > 12) {
			vm.mesesPagar = 12;
		}
		if (vm.mesesPagar < 1) {
			vm.mesesPagar = 1;
		}
	}

	function ok() {
		cajasFactory.pagoAdelantado(items.Session, items.Concepto.CLV_SERVICIO, items.Concepto.Clv_llavedelservicio, items.Concepto.Clv_UnicaNet, items.CLAVE, vm.mesesPagar, items.Suscriptor.Clv_TipoCliente, items.Contrato).then(function(data) {
			$uibModalInstance.dismiss('cancel');
			$rootScope.$emit("realoadPagos", {});
		});
	}

	function cancel() {
		$uibModalInstance.dismiss('cancel');
	}

}
