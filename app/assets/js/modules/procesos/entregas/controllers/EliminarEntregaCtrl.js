function EliminarEntregaCtrl($uibModalInstance, consecutivo, entregasFactory, $rootScope, ngNotify) {
	var vm = this;
	vm.cancel = cancel;
	vm.consecutivo = consecutivo;
	vm.eliminarEntrega = eliminarEntrega;


	function eliminarEntrega() {
		entregasFactory.eliminarEntrega(vm.consecutivo).then(function(data) {
			$uibModalInstance.dismiss('cancel');
			ngNotify.set('Entrega Parcial Eliminada Correctamente.', 'error');
			$rootScope.$emit("updateEntrada", {});
		});
	}

	function cancel() {
		$uibModalInstance.dismiss('cancel');
	}
}

angular
	.module('app')
	.controller('EliminarEntregaCtrl', EliminarEntregaCtrl);
