angular
	.module('app')
	.controller('ModalYaPagoCtrl', ModalYaPagoCtrl);


function ModalYaPagoCtrl($uibModal, cajasFactory, $uibModalInstance, items) {
	var vm = this;
	vm.cancel = cancel;
	vm.ok = ok;


	function ok() {
		$uibModalInstance.dismiss('cancel');
		vm.animationsEnabled = true;
		var modalInstance = $uibModal.open({
			animation: vm.animationsEnabled,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'assets/js/modules/cajas/views//modalPagar.html',
			controller: 'ModalPagarCtrl',
			controllerAs: 'ctrl',
			backdrop: 'static',
			keyboard: false,
			size: "md",
			resolve: {
				items: function() {
					return items;
				}
			}
		});
	}

	function cancel() {
		$uibModalInstance.dismiss('cancel');
	}

}
