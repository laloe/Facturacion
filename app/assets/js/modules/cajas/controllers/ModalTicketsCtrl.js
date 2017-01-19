angular
	.module('app')
	.controller('ModalTicketsCtrl', ModalTicketsCtrl);

function ModalTicketsCtrl($uibModal, $uibModalInstance, cajasFactory, contrato) {
	var vm = this;
	vm.cancel = cancel;
	vm.dameFactura = dameFactura;
	initialData();


	function initialData() {
		cajasFactory.dameHistorialServicios(contrato).then(function(data) {
			vm.tickets = data.GetBuscaFacturasHistorialListResult;
		});
	}

	function dameFactura(factura) {
		vm.animationsEnabled = true;
		var modalInstance = $uibModal.open({
			animation: vm.animationsEnabled,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'assets/js/modules/cajas/views/modalSingleTicket.html',
			controller: 'ModalSingleTicketCtrl',
			controllerAs: 'ctrl',
			backdrop: 'static',
			keyboard: false,
			size: "sm",
			resolve: {
				factura: function() {
					return factura;
				}
			}
		});
	}

	function cancel() {
		$uibModalInstance.dismiss('cancel');
	}

}
