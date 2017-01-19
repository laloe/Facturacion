angular
	.module('app')
	.controller('ModalClabeCtrl', ModalClabeCtrl);

function ModalClabeCtrl($uibModalInstance, cajasFactory, clabe) {
	var vm = this;
	vm.cancel = cancel;
	initialData();


	function initialData() {
		vm.Clabe = clabe;
	}

	function cancel() {
		$uibModalInstance.dismiss('cancel');
	}

}
