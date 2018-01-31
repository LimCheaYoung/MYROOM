// 앵귤라 모듈 만들기
var app = angular.module("MyShop", []);
app.controller("myshop", function($rootScope,$scope, $http, LoginService){
	LoginService.async().then(function(){
		var result = LoginService.data();
		console.log(result);
		console.log("세션",result.data);
  	   if(result.data.status == 0){
  		  $rootScope.loginbool = false;
  		  location.href ="#!/friend";
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
	$scope.target = {
	};
	$scope.price = "";
	$scope.shopbool = true;
	$scope.selectshop = function(){
	      $http.post("selectshop", "")
	           .then(function(result){ // 성공하면 오는 곳
	        	   $scope.shop = result.data.result;
	        	   $scope.shopbool = true;
	        	   $scope.target = 1;
	          }, function(result){ // 실패(오류) 하면 오는 곳
	            console.log(result);
	       });
	}
	$scope.searchshop = function(){
	      $http.post("searchshop", "", {params: $scope.shop})
	           .then(function(result){ // 성공하면 오는 곳
	        	   $scope.shop = result.data.result;
	        	   if($scope.shop.length == 0){
	        		   alert("검색 결과가 없습니다.");
	        	   }
	        	   $scope.target = 1;
	          }, function(result){ // 실패(오류) 하면 오는 곳
	            console.log(result);
	   });
	}
	$scope.selectmine = function(){
	      $http.post("selectmine", "", {params: $rootScope.user})
	           .then(function(result){ // 성공하면 오는 곳
	        	   $scope.shop = result.data.result;
	        	   $scope.shopbool = false;
	          }, function(result){ // 실패(오류) 하면 오는 곳
	            console.log(result);
	   });
	}
	$scope.updel = function(index){
		
	      $http.post("updel", "", {params: {itemno : $scope.shop[index].itemno, kkono : $rootScope.user.kkono}})
	           .then(function(result){ // 성공하면 오는 곳
	        	   if(result.data.msg){
	        		   alert(result.data.msg);
	        	   }
	        	   $scope.shop = result.data.result;
	          }, function(result){ // 실패(오류) 하면 오는 곳
	            console.log(result);
	   });
	}
	$scope.index = "";
	$scope.update = function(index){
		$scope.index = index;
	}
	$scope.upshop = function(index){
		console.log($scope.shop[index]);
	     $http.post("upshop", "", {params: {itemno : $scope.shop[index].itemno, price : $scope.price}})
	           .then(function(result){ // 성공하면 오는 곳
	        	   if(result.data.msg){
	        		   alert(result.data.msg);
	        	   }
	        	   $scope.shop = result.data.result;
	          }, function(result){ // 실패(오류) 하면 오는 곳
	            console.log(result);
	          });
	}
	
	$scope.menu = function(index){
		$scope.target = index;
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