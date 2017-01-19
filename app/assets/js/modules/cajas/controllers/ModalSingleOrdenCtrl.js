angular
	.module('app')
	.controller('ModalSingleOrdenCtrl', ModalSingleOrdenCtrl);

function ModalSingleOrdenCtrl($uibModalInstance, cajasFactory, clave, GlobalService) {
	var vm = this;
	vm.cancel = cancel;
	initialData();


	function initialData() {
		cajasFactory.dameOrdenServicio(clave).then(function(data) {
			vm.url = GlobalService.getUrlReportes() + '/Reportes/' + data.GetUrlOrdSerResult[0].Url;
			$('#ordenesURL').attr('src', vm.url);
		});
	}

	function cancel() {
		$uibModalInstance.dismiss('cancel');
	}
}
