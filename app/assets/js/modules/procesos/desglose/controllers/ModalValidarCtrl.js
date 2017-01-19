function ModalValidarCtrl($uibModalInstance, $uibModal, sessionFactory, items, desgloseFactory, $rootScope, ngNotify) {
	var vm = this;
	vm.cancel = cancel;
	vm.items = items;
	vm.autenticar = autenticar;
	vm.editarDesglose = editarDesglose;
	vm.eliminarDesglose = eliminarDesglose;
	var id = items.id;
	var consecutivo = items.consecutivo;

	function autenticar() {
		var credenciales = sessionFactory.getUser();
		desgloseFactory.validarCajero(credenciales.usuario, vm.user, vm.pass).then(function(data) {
			vm.auth = data.GetDeepValidacionLoginCajeraResult.Existe;
			if (id == 1 && vm.auth == 1) {
				$uibModalInstance.dismiss('cancel');
				var items = {
					action: "editar",
					titulo: "Editar Desglose de Moneda",
					consecutivo: consecutivo
				};
				var modalInstance = $uibModal.open({
					animation: true,
					ariaLabelledBy: 'modal-title',
					ariaDescribedBy: 'modal-body',
					templateUrl: 'assets/js/modules/procesos/desglose/views/modalNew.html',
					controller: 'ModalNewCtrl',
					controllerAs: '$ctrl',
					backdrop: 'static',
					keyboard: false,
					size: "lg",
					windowClass: 'app-modal-window-large ',
					resolve: {
						items: function() {
							return items;
						}
					}
				});
			} else if (id == 2 && vm.auth == 1) {
				$uibModalInstance.dismiss('cancel');
				var modalInstance = $uibModal.open({
					animation: true,
					ariaLabelledBy: 'modal-title',
					ariaDescribedBy: 'modal-body',
					templateUrl: 'assets/js/modules/procesos/desglose/views/modalEliminar.html',
					controller: 'ModalEliminarCtrl',
					controllerAs: '$ctrl',
					backdrop: 'static',
					keyboard: false,
					size: "sm",
					resolve: {
						consecutivo: function() {
							return consecutivo;
						}
					}
				});
			} else {
				ngNotify.set('Usuario y/o contraseña incorrectos.', 'error');
			}
		});
	}

	function editarDesglose(consecutivo) {
		var items = {
			action: "editar",
			titulo: "Editar Desglose de Moneda",
			consecutivo: consecutivo
		};
		var modalInstance = $uibModal.open({
			animation: true,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'assets/js/modules/procesos/desglose/views/modalNew.html',
			controller: 'ModalNewCtrl',
			controllerAs: '$ctrl',
			backdrop: 'static',
			keyboard: false,
			size: "lg",
			windowClass: 'app-modal-window-large ',
			resolve: {
				items: function() {
					return items;
				}
			}
		});
	}

	function eliminarDesglose(consecutivo) {
		var modalInstance = $uibModal.open({
			animation: true,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'assets/js/modules/procesos/desglose/views/modalEliminar.html',
			controller: 'ModalEliminarCtrl',
			controllerAs: '$ctrl',
			backdrop: 'static',
			keyboard: false,
			size: "sm",
			resolve: {
				consecutivo: function() {
					return consecutivo;
				}
			}
		});
	}

	function cancel() {
		$uibModalInstance.dismiss('cancel');
	}
}

angular
	.module('app')
	.controller('ModalValidarCtrl', ModalValidarCtrl);
