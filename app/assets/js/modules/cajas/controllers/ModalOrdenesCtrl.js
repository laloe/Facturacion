angular
	.module('app')
	.controller('ModalOrdenesCtrl', ModalOrdenesCtrl);

function ModalOrdenesCtrl($uibModal, $uibModalInstance, cajasFactory, contrato) {
	var vm = this;
	vm.cancel = cancel;
	vm.selectStatus = 'E';
	vm.statusChange = initialData;
	vm.sigleOrder = sigleOrder;
	initialData();


	function initialData() {
		cajasFactory.dameHistorialOrdenes(contrato, vm.selectStatus).then(function(data) {
			if (data.GetBuscaOrdenServicioListResult.length == 0) {
				vm.mostrarMensaje = true;
				vm.ordenes = '';
			} else {
				vm.mostrarMensaje = false;
				vm.ordenes = data.GetBuscaOrdenServicioListResult;
			}
		});
	}

	function sigleOrder(clave) {
		vm.animationsEnabled = true;
		var modalInstance = $uibModal.open({
			animation: vm.animationsEnabled,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'assets/js/modules/cajas/views/modalSingleOrden.html',
			controller: 'ModalSingleOrdenCtrl',
			controllerAs: 'ctrl',
			backdrop: 'static',
			keyboard: false,
			size: "lg",
			windowClass: 'app-modal-window',
			resolve: {
				clave: function() {
					return clave;
				}
			}
		});
	}

	function cancel() {
		$uibModalInstance.dismiss('cancel');
	}

}
