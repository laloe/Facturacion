angular
	.module('app')
	.controller('ModalEdoCuentaCtrl', ModalEdoCuentaCtrl);

function ModalEdoCuentaCtrl($uibModalInstance, cajasFactory, contrato) {
	var vm = this;
	vm.cancel = cancel;

	function cancel() {
		$uibModalInstance.dismiss('cancel');
	}
}
