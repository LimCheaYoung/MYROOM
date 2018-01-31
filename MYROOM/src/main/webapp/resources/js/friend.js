// 앵귤라 모듈 만들기
var app = angular.module("MyFriend", []);
app.controller("myfriend", function($rootScope,$scope, $http, LoginService){
	LoginService.async().then(function(){
		var result = LoginService.data();
  	   if(result.data.status == 0){
  		  $rootScope.loginbool = false;
  		  $scope.selectBest();
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
	$scope.check = true;
	
	$scope.selectBest = function(){
	      $http.post("selectbest", "")
	           .then(function(result){ // 성공하면 오는 곳
	        	   $scope.friend = result.data.result;
	        	   $scope.check = true;
	          }, function(result){ // 실패(오류) 하면 오는 곳
	        	  alert("예기치 못한 오류가 발생하였습니다. 다시 시도해주세요.");
	       });
	}
	$scope.selectfriend = function(){
	      $http.post("selectfriend", "", {params: $scope.friend})
	           .then(function(result){ // 성공하면 오는 곳
	        	   $scope.friend = result.data.result;
	        	   if($scope.friend.lenght == 0){
	        		   alert("그런 사람 없습니다.");
	        	   }
	          }, function(result){ // 실패(오류) 하면 오는 곳
	        	  alert("예기치 못한 오류가 발생하였습니다. 다시 시도해주세요.");
	   });
	}
	$scope.myfriend = function(){
	      $http.post("myfriend", "", {params: $rootScope.user})
	           .then(function(result){ // 성공하면 오는 곳
	        	   $scope.friend = result.data.result;
	        	   $scope.check = false;
	          }, function(result){ // 실패(오류) 하면 오는 곳
	        	  alert("예기치 못한 오류가 발생하였습니다. 다시 시도해주세요.");
	   });
	}
	$scope.addfriend = function(index){
		console.log($scope.friend[index]);
	    $http.post("addfriend", "", {params: {kkono : $rootScope.user.kkono, friendno : $scope.friend[index].kkono}})
	           .then(function(result){ // 성공하면 오는 곳
	        	   if(result.data.msg){
	        		   alert(result.data.msg);
	        	   }
	        	   if(result.data.result){
	        		   $scope.friend = result.data.result;
	        	   }
	          }, function(result){ // 실패(오류) 하면 오는 곳
	        	  alert("예기치 못한 오류가 발생하였습니다. 다시 시도해주세요.");
	   });
	}
	$scope.delfriend = function(index){
	      $http.post("delfriend", "", {params: {kkono : $rootScope.user.kkono, friendno : $scope.friend[index].kkono}})
	           .then(function(result){ // 성공하면 오는 곳
	        	   if(result.data.msg){
	        		   alert(result.data.msg);
	        	   }
	        	   if(result.data.result){
	        		   $scope.friend = result.data.result;
	        		   
	        	   }
	          }, function(result){ // 실패(오류) 하면 오는 곳
	        	  alert("예기치 못한 오류가 발생하였습니다. 다시 시도해주세요.");
	   });
	}
	$scope.findroom = function(index){
	      $http.post("findroom", "", {params: $scope.friend[index]})
          .then(function(result){ // 성공하면 오는 곳
        	  $scope.roomon = true;
        	  $scope.myroom(result.data.data, result.data.inven);
         }, function(result){ // 실패(오류) 하면 오는 곳
        	 alert("예기치 못한 오류가 발생하였습니다. 다시 시도해주세요.");
         });
	}
	$scope.myroom = function(data, inven){
		var myroom = document.getElementById("myCanvas");
        //배경 
        var background = myroom.getContext("2d");

        //캔버스 가로
        var wd;
        //캔버스 새로
        var hd;
        //움직이기모드(평상시)
        var move = false;
        //전체보기보기모드
        var zoomout = false;
        var src;
        //아이템번호
        var itemno = 0;
        //스크롤
        var scrollx;
        var scrolly;
        //타일(배경)
        var tile = data.tile.split(" ");
        var furniture = data.object.split(" ");
        
        wd = $("#myCanvas").width();
        hd = $("#myCanvas").height();
        
        
        //마우스가 클릭할 때
        $(".inBox canvas").on("mousedown", function () {
            mousedown();
        });
        $(".inBox canvas").on("mousemove", function () {
            mousemove();
        });
        $(".inBox canvas").on("mouseup", function (event) {
            mouseup(event);
        });


        function mousedown() {
            if (!zoomout) {
                move = true;
                scrollx = event.offsetX;
                scrolly = event.offsetY;
            }
        }
        //마우스가 왼쪽 버튼을 땔 때 
        function mouseup(event) {
            move = false;
        }

        function mousemove() {
            if (move && !zoomout) {
                var nowscrollx = $(".inBox").scrollLeft();
                var nowscrolly = $(".inBox").scrollTop();
                var movex = scrollx - event.offsetX;
                $(".inBox").scrollLeft(nowscrollx + movex);

                var movey = scrolly - event.offsetY;
                $(".inBox").scrollTop(nowscrolly + movey);

            }
        }
        var checkTile = true;
        var checkFurniture = true;
        function setting(data, type){
        	if(type == "tile"){
        		background.clearRect(0,0,6400,6400);
        	}
        	var array = [];
	       	 $.each(data, function (index, value) {
	                var y = (index - (index % 64)) / 64;
	                var x = (index - (y * 64));

	                if (value != 0) {
	                	$.each(inven, function (i, result) {
	        	     		if(result.itemno == value){
	        	     			if(type == "tile"){
	        	     				checkTile = false;
	        	            	} else if(type == "furniture"){
	        	            		checkFurniture = false;
	        	            	}
	        	     			$rootScope.items.push({itemno : value});
	        	     			item = 
	                            array.push({image: value, x: x, y: y, wd: result.wd, hd: result.hd});
	        	     		}  
	                	});
	                }
	            });
	       	if((checkTile && checkFurniture) && type == "furniture"){
        		background.clearRect(0,0,6400,6400);
        		return false;
        	}

	       	setTimeout(function(){
	       		image(array, background);
	       	}, 200);
       }
       function image(array, background){
    	   $.each(array, function (index, value) {
	       		var image = new Image();
	       		image.src = "resources/item/" +  value.image + ".png";
	       		background.drawImage(image, value.x * 100, value.y * 100, value.wd, value.hd);
	       	});
       }
        
       setting(tile, 'tile');
       setting(furniture, 'furniture');

	}
});