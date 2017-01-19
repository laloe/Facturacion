function ModalEliminarCtrl($uibModalInstance, consecutivo, desgloseFactory, $rootScope, ngNotify) {
	var vm = this;
	vm.cancel = cancel;
	vm.consecutivo = consecutivo;
	vm.eliminarEntrega = eliminarEntrega;


	function eliminarEntrega() {
		desgloseFactory.deleteDesglose(vm.consecutivo).then(function(data) {
			$uibModalInstance.dismiss('cancel');
			ngNotify.set('Desglose de Moneda Eliminado Correctamente', 'success');
			$rootScope.$emit("updateDesglose", {});
		});
	}

	function cancel() {
		$uibModalInstance.dismiss('cancel');
	}
}

angular
	.module('app')
	.controller('ModalEliminarCtrl', ModalEliminarCtrl);
