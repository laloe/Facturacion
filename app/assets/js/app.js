angular
	.module('app', ['ui.bootstrap', 'ui.router', 'blockUI', 'ngNotify', 'angular-loading-bar', 'angularUtils.directives.dirPagination'])
	.config(function($provide, $httpProvider, cfpLoadingBarProvider) {
		cfpLoadingBarProvider.includeSpinner = false;

		$provide.factory('ErrorHttpInterceptor', function($q, $injector) {
			var errorCounter = 0;

			function notifyError(rejection) {
				var mensaje = rejection.statusText;
				var notify = $injector.get('ngNotify');
				var content = '¡Se ha generado un error! \n' + mensaje;
				notify.set(content, {
					type: 'error',
					sticky: true
				});
			}
			return {
				requestError: function(rejection) {
					notifyError(rejection);
					return $q.reject(rejection);
				},
				responseError: function(rejection) {
					notifyError(rejection);
					sessionStorage.clear();
					if (rejection.status == 401) {
						location.href = "/";
					}
					return $q.reject(rejection);
				}
			};
		});
		$httpProvider.interceptors.push('ErrorHttpInterceptor');
		$httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
		delete $httpProvider.defaults.headers.common['X-Requested-With'];
	})
	.constant('APP_CONFIG', window.appConfig)
	.run(function($rootScope, $state, $stateParams) {
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;
	});
