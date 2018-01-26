// 앵귤라 모듈 만들기
var app = angular.module("MyFriend", []);
app.controller("myfriend", function($rootScope,$scope, $http, LoginService){
	LoginService.async().then(function(){
		var result = LoginService.data();
		console.log(result);
		console.log("세션",result.data);
  	   if(result.data.status == 0){
  		  $rootScope.loginbool = false;
  	   }else if(result.data.status == 1){
  		  $rootScope.user = result.data.user;
  		  $rootScope.loginbool = true;
  		  $scope.selectBest();
  	   }
	});
	$scope.friend={
			
	}
	$scope.selectBest = function(){
	      $http.post("selectbest", "")
	           .then(function(result){ // 성공하면 오는 곳
	        	   $scope.friend = result.data.result;
	        	   console.log($scope.friend);
	          }, function(result){ // 실패(오류) 하면 오는 곳
	            console.log(result);
	       });
	}
	$scope.selectfriend = function(){
	      $http.post("selectfriend", "", {params: $scope.friend})
	           .then(function(result){ // 성공하면 오는 곳
	        	   $scope.friend = result.data.result;
	        	   console.log($scope.friend);
	          }, function(result){ // 실패(오류) 하면 오는 곳
	            console.log(result);
	   });
	}
	
});