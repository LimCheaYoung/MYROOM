// 앵귤라 모듈 만들기
var app = angular.module("MyShop", []);
app.controller("myshop", function($rootScope,$scope, $http, LoginService){
	LoginService.async().then(function(){
		var result = LoginService.data();
		console.log(result);
		console.log("세션",result.data);
  	   if(result.data.status == 0){
  		  $rootScope.loginbool = false;
  	   }else if(result.data.status == 1){
  		  $rootScope.user = result.data.user;
  		  $rootScope.loginbool = true;
  		  $scope.selectshop();
  	   }
	});
	$scope.shop={
	}
	$scope.data={
	}
	$scope.selectshop = function(){
	      $http.post("selectshop", "")
	           .then(function(result){ // 성공하면 오는 곳
	        	   $scope.shop = result.data.result;
	        	   console.log($scope.shop);
	          }, function(result){ // 실패(오류) 하면 오는 곳
	            console.log(result);
	       });
	}
	$scope.searchshop = function(){
	      $http.post("searchshop", "", {params: $scope.shop})
	           .then(function(result){ // 성공하면 오는 곳
	        	   $scope.shop = result.data.result;
	          }, function(result){ // 실패(오류) 하면 오는 곳
	            console.log(result);
	   });
	}
	
	$scope.additem = function(index){
		$scope.data.kkono = $rootScope.user.kkono;
		$scope.data.kkono2 = $scope.shop[index].kkono;
		$scope.data.price = $scope.shop[index].price;
		$scope.data.itemno = $scope.shop[index].itemno;
		console.log($scope.data);
        $http.post("addpoint", "", {params: $scope.data})
         .then(function(result){ // 성공하면 오는 곳
	         	if(result.data.msg){
	        		alert(result.data.msg);
	        	}
	          }, function(result){ // 실패(오류) 하면 오는 곳
	            console.log(result);
	       });
	}
});