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
	$scope.friend={};
	$scope.data={};
	$scope.inven={};
	$scope.roomon=false;
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
	$scope.room = function(index){
	      $http.post("findroom", "", {params: $scope.friend[index]})
          .then(function(result){ // 성공하면 오는 곳
        	  $scope.roomon=true;
        	  $scope.data = result.data.data;
        	  $scope.inven = result.data.inven;
         }, function(result){ // 실패(오류) 하면 오는 곳
           console.log(result);
         });
	}
	$scope.myroom = function(){
		var myroom = document.getElementById("myCanvas");
		var background = myroom.getContext("2d");
		var wd;
		var hd;
		var $tile = $scope.data.tile;
		//기본 룸 설정
        $scope.room = function() {
            $(".inBox").height($(".inBox").width() / 5 * 2.2 + "px");
            $("#myCanvas").attr("width", 100 * 64 + "px");
            $("#myCanvas").attr("height", 100 * 64 + "px");
            wd = $("#myCanvas").width();
            hd = $("#myCanvas").height();
        	
            $.each($tile, function (index, value) {
                var y = (index - (index % 64)) / 64;
                var x = (index - (y * 64));
                
                if (value != 0) {
                	$.each($scope.inven, function (i, result) {
        	     		if(result.itemno == value){
        	     			var image = new Image();
                            image.src = itemno + ".png";
                            background.drawImage(image, x * (wd / 64), y * (wd / 64), result.wd, result.hd);
        	     		}
                    });
                }
                
            });
        }
	}
});