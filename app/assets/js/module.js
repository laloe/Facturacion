angular
	.module('app')
	.config(confRutas)

function confRutas($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');
  	var states = [
      {
        name: 'cajas',
        data: {
            pageTitle: 'Facturación | Cajas'
        },
        url: '/facturacion/cajas',
        templateUrl: 'assets/js/modules/cajas/views/facturacionCajas.html',
        controller: 'FacturacionCajasCtrl',
        controllerAs: 'ctrl'
      },
      {
        name: 'ventas',
        data: {
            pageTitle: 'Facturación | Ventas'
        },
        url: '/facturacion/ventas',
        templateUrl: 'assets/js/modules/ventas/views/facturacionVentas.html',
        controller: 'FacturacionVentasCtrl',
        controllerAs: 'ctrl'
      },
      {
        name: 'dashboard',
        data: {
            pageTitle: 'Accediendo.....'
        },
        url: '/{token}',
        templateUrl: 'assets/js/modules/login/views/facturacionLogin.html',
        controller: 'FacturacionLoginCtrl',
        controllerAs: 'ctrl'
      },
      {
        name: 'cortes',
        url: '/reportes/cortes',
        data: {
            pageTitle: 'Reportes | Cortes'
        },
        templateUrl: 'assets/js/modules/cortes/views/ReporteCortes.html',
        controller: 'ReporteCajasCtrl',
        controllerAs: '$ctrl'
      },
      {
        name: 'cortesEspeciales',
        url: '/reportes/cortesEspeciales',
        data: {
            pageTitle: 'Reportes | Especiales'
        },
        templateUrl: 'assets/js/modules/cortesEspeciales/views/ReporteSucursales.html',
        controller: 'ReporteSucursalesCtrl',
        controllerAs: '$ctrl'
      },
      {
        name: "procesos",
        template: '<ui-view></ui-view>',
        abstract: true,
        data: {
            pageTitle: 'Procesos'
        },
      },
      {
        name: 'procesos.entregas',
        url: '/procesos/entregas',
        data: {
            pageTitle: 'Procesos | Entregas Parciales'
        },
        templateUrl: 'assets/js/modules/procesos/entregas/views/EntregasParciales.html',
        controller: 'EntregasParcialesCtrl',
        controllerAs: '$ctrl'
      },
      {
        name: 'procesos.desglose',
        url: '/procesos/desglose',
        data: {
            pageTitle: 'Procesos | Desglose de Moneda'
        },
        templateUrl: 'assets/js/modules/procesos/desglose/views/DesgloseMoneda.html',
        controller: 'DesgloseMonedaCtrl',
        controllerAs: '$ctrl'
      },
      {
        name: 'procesos.arqueo',
        url: '/procesos/arqueo',
        data: {
            pageTitle: 'Procesos | Arqueo de Cajas'
        },
        templateUrl: 'assets/js/modules/procesos/arqueo/views/ArqueoCajas.html',
        controller: 'ArqueoCajasCtrl',
        controllerAs: '$ctrl'
      },
    ];


	  states.forEach(function(state) {
      $stateProvider.state(state);
    });
}
