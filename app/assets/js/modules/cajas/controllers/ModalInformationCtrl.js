angular
	.module('app')
	.controller('ModalInformationCtrl', ModalInformationCtrl);

function ModalInformationCtrl($uibModalInstance, cajasFactory, contrato) {
	var vm = this;
	vm.cancel = cancel;
	initialData();

	function initialData() {
		cajasFactory.dameInformacionCliente(contrato).then(function(data) {
			vm.informacionCliente = data.GetInformacionClientePeriodosListResult[0];
		});
	}

	function cancel() {
		$uibModalInstance.dismiss('cancel');
	}

}
