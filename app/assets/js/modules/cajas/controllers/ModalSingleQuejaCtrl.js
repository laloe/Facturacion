angular
	.module('app')
	.controller('ModalSingleQuejaCtrl', ModalSingleQuejaCtrl);

function ModalSingleQuejaCtrl($uibModalInstance, cajasFactory, clave, GlobalService) {
	var vm = this;
	vm.cancel = cancel;
	initialData();


	function initialData() {
		cajasFactory.dameSingleQueja(clave).then(function(data) {
			vm.url = GlobalService.getUrlReportes() + '/Reportes/' + data.GetConsultarQuejasTableListResult[0].Colonia;
			$('#reporteURL').attr('src', vm.url);
		});
	}

	function cancel() {
		$uibModalInstance.dismiss('cancel');
	}
}
