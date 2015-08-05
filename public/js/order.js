"use strict";

var application = angular.module("myOrderApp",[]).run(['$rootScope',function($rootScope){
	 console.log($rootScope);
   }]);



application.controller('orderDetailController',[
	"$scope",
	"orderService",
	"$log",
	function($scope,orderService){
	var od = this;

	function refresh(orderDetail) {
        orderService.getOrder().then(function(data) {
          orderDetail.orderId = data.order.orderId;
          orderDetail.action = data.order.action;
          orderDetail.billingAccountNumber = data.order.attributes[0]['billingAccountNumber'];
          orderDetail.pon = data.order.attributes[1]['pon'];
          orderDetail.lines = data.order.orderLines;
        }, displayError);
  }

  refresh(od);

	function displayError(msg) {
        od.errorMsg = msg;
  }

}]);

application.service("orderService",["$http","$q",
/*new */function($http,$q){
			var svc = this;
			svc.getOrder = function(){
				var req = {
 							method: 'GET',
 							url: 'http://localhost:3100'
				}

				return $http(req).then(svc.handleSuccess, svc.handleError);
			}

			svc.handleSuccess = function(response) {
            console.log(response.data[0]);
        		return response.data[0];
      		}

      		svc.handleError = function(response) {
        		if (!angular.isObject(response.data) && !response.data) {
          			return($q.reject("An unknown error occurred."));
        		}
        		return($q.reject(response.data));
      		}
      }
	]);