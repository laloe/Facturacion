var multiSelect = {
	bindings: {
		options: '=',
	},
	controller: function (){
		this.transfer = function(from, to, index) {
	        if (index >= 0) {
	          to.push(from[index]);
	          from.splice(index, 1);
	        } else {
	          	for (var i = 0; i < from.length; i++) {
	            	to.push(from[i]);
	        	}
	        	from.length = 0;
        	}
        }
	},
	template: `
		<div class="dualmultiselect">
	       <div class="row">
	        <div class="col-lg-5 col-md-5 col-sm-5">
	          <input class="form-control" placeholder="{{$ctrl.options.filterPlaceHolder}}" ng-model="$ctrl.searchTerm">
	        </div>
	       </div>
	       <div class="row">
	        <div class="col-lg-6 col-md-6 col-sm-6">
	          <label>{{$ctrl.options.labelAll}}</label>
	          <button type="button" class="btn btn-warning btn-xs" ng-click="$ctrl.transfer($ctrl.options.items, $ctrl.options.selectedItems, -1)">Seleccionar Todo </button>
	          <div class="pool">
	            <ul>
	              <li ng-click="$ctrl.transfer($ctrl.options.items, $ctrl.options.selectedItems, $ctrl.options.items.indexOf(item))" ng-repeat="item in $ctrl.options.items | filter: $ctrl.searchTerm | orderBy: $ctrl.options.orderProperty">
	                <a href="">{{item[$ctrl.options.labelShow]}}</a>
	              </li>
	            </ul>
	          </div>
	        </div>
	        <div class="col-lg-6 col-md-6 col-sm-6">
	          <label>{{$ctrl.options.labelSelected}}</label>
	          <button type="button" class="btn btn-warning btn-xs" ng-click="$ctrl.transfer($ctrl.options.selectedItems, $ctrl.options.items, -1)"> Deseleccionar Todo </button>
	          <div class="pool">
	            <ul>
	              <li ng-click="$ctrl.transfer($ctrl.options.selectedItems, $ctrl.options.items, $ctrl.options.selectedItems.indexOf(item))" ng-repeat="item in $ctrl.options.selectedItems | orderBy: $ctrl.options.orderProperty">
	                <a href="" >{{item[$ctrl.options.labelShow]}}</a>
	              </li>
	            </ul>
	          </div>
	        </div>
	       </div>
	    </div>
	`
};


angular
	.module('app')
	.component('multiSelect', multiSelect);
