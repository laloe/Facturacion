angular
	.module('app')
	.controller('ModalHistorialCtrl', ModalHistorialCtrl);

function ModalHistorialCtrl($uibModal, $uibModalInstance, contrato) {
	var vm = this;
	vm.cancel = cancel;
	vm.ok = ok;
	vm.historial = 1;

	function cancel() {
		$uibModalInstance.dismiss('cancel');
	}

	function ok() {
		if (vm.historial == 1) {
			vm.animationsEnabled = true;
			$uibModalInstance.dismiss('cancel');
			var modalInstance = $uibModal.open({
				animation: vm.animationsEnabled,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'assets/js/modules/cajas/views/modalTickets.html',
				controller: 'ModalTicketsCtrl',
				controllerAs: 'ctrl',
				backdrop: 'static',
				keyboard: false,
				size: "lg",
				resolve: {
					contrato: function() {
						return contrato;
					}
				}
			});
		} else if (vm.historial == 2) {
			vm.animationsEnabled = true;
			$uibModalInstance.dismiss('cancel');
			var modalInstance = $uibModal.open({
				animation: vm.animationsEnabled,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'assets/js/modules/cajas/views/modalOrdenes.html',
				controller: 'ModalOrdenesCtrl',
				controllerAs: 'ctrl',
				backdrop: 'static',
				keyboard: false,
				size: "lg",
				resolve: {
					contrato: function() {
						return contrato;
					}
				}
			});
		} else {
			vm.animationsEnabled = true;
			$uibModalInstance.dismiss('cancel');
			var modalInstance = $uibModal.open({
				animation: vm.animationsEnabled,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'assets/js/modules/cajas/views/modalReportes.html',
				controller: 'ModalReportesCtrl',
				controllerAs: 'ctrl',
				backdrop: 'static',
				keyboard: false,
				size: "lg",
				resolve: {
					contrato: function() {
						return contrato;
					}
				}
			});
		}
	}

}
