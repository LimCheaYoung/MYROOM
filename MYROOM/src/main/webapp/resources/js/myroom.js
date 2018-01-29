// 앵귤라 모듈 만들기
var app = angular.module("MyRoom", []);
app.controller("myroom", function($rootScope,$scope, $http, LoginService){
	LoginService.async().then(function(){
		var result = LoginService.data();
		console.log(result);
		console.log("세션",result.data);
  	   if(result.data.status == 0){
  		  $rootScope.loginbool = false;
  	   }else if(result.data.status == 1){
  		  $rootScope.user = result.data.user;
  		  $rootScope.loginbool = true;
  		  $scope.selectRoom();
  	   }
	});
	$scope.selectRoom = function(){
		console.log("room시작전", $rootScope.loginbool);
		if($rootScope.loginbool){
			console.log("room실행됨", $rootScope.loginbool);
			$http.post("selectRoom", "", {params: $rootScope.user})
	           .then(function(result){ // 성공하면 오는 곳
	        	   $scope.data = result.data.result;
	        	   $scope.inven.data = result.data.inven;
	        	   $rootScope.user.point = result.data.point.point;
	        	   $scope.myroom();
	        	   console.log($scope.inven.data);
	          }, function(result){ // 실패(오류) 하면 오는 곳
	            console.log(result);
	       });
		}
	}

	$scope.data = {};
	$scope.item = {
	};
	$scope.inven = {
			data : []
	};
	$scope.tabActive = 0; 
	$rootScope.kakao = function(){
	    // 사용할 앱의 JavaScript 키를 설정해 주세요.
        Kakao.init('e92886bf85b0dc084950d47fe7164b91');
        Kakao.Auth.login({
          success: function(authObj) {
              Kakao.API.request({
                  url: '/v1/user/me',
                  success: function(res) {
                 	$rootScope.user.email = res.kaccount_email;
                	$rootScope.user.name = res.properties.nickname;
                	$rootScope.user.kkono = res.id;
            		$scope.item.kkono = res.id;
            		$scope.inven.kkono = res.id;
            		$rootScope.loginbool = true;
            		console.log("login",$rootScope.user);
            		$scope.selectRoom();
  	    		}
              });
          },
	          fail: function(err) {
	             alert("예기치 못한 오류가 발생하였습니다. 다시 시도해주세요.");
	          }
        });
	}
	
	$scope.additem = function(){
		if($("#type").val() == "타일"){
			$scope.item.type = 1;
		}else if($("#type").val() == "가구"){
			$scope.item.type = 2;
		}
		
		if($scope.item.name == ""){
			alert("이름을 입력해주세요.");
			return false;
		}
		
		if($scope.item.name.length > 11){
			alert("10자리 이내의 이름으로 입력해주세요.");
			return false;
		}
		
		$http.post("additem", "", {params: $scope.item})
           .then(function(result){ // 성공하면 오는 곳
        	if(result.data.msg){
        		alert(result.data.msg);
        	} else {
        		alert("정상으로 저장 되었습니다.");
        	}
          }, function(result){ // 실패(오류) 하면 오는 곳
        	 alert("예기치 못한 오류가 발생하였습니다. 다시 시도해주세요.");
       });           
	}
	
	$scope.addshop = function(){
		if($scope.item.price == ""){
			alert("가격을 입력해주세요.");
			return false;
		}
		
		if($scope.item.price.length > 11){
			alert("11자리 이내의 가격으로 입력해주세요.");
			return false;
		}
		
		$http.post("addshop", "", {params: $scope.item})
	        .then(function(result){ // 성공하면 오는 곳
	     	if(result.data.msg){
	     		alert(result.data.msg);
	     	} else {
	     		alert("정상으로 저장 되었습니다.");
	     	}
	       }, function(result){ // 실패(오류) 하면 오는 곳
	     	 alert("예기치 못한 오류가 발생하였습니다. 다시 시도해주세요.");
	    });
	}
	$scope.selectinven = function(index){
		$http.post("selectinven", "", {params: $scope.user})
        .then(function(result){ // 성공하면 오는 곳
	     	if(result.data.msg){
	     		alert(result.data.msg);
	     	} else {
	     		$scope.inven.data = result.data.inven;
	     		console.log($scope.inven);
	     	}
       }, function(result){ // 실패(오류) 하면 오는 곳
     	 alert("예기치 못한 오류가 발생하였습니다. 다시 시도해주세요.");
       });
	}
	$scope.myroom = function(){
		var myroom = document.getElementById("myCanvas");
		var myobject = document.getElementById("myobject");
		var mysetline = document.getElementById("mysetline");
		var myhover = document.getElementById("myhover");
        //배경 
        var background = myroom.getContext("2d");
        //배경 
        var object = myobject.getContext("2d");
        //편집 
        var myinterface = mysetline.getContext("2d");
        //캐릭터
        var character = mysetline.getContext("2d");

        //캔버스 가로
        var wd;
        //캔버스 새로
        var hd;
        //움직이기모드(평상시)
        var move = false;
        //전체보기보기모드
        var zoomout = false;
        //편집모드
        var set = false;
        var src;
        var tilewd;
        var tilehd;
        var type;
        //아이템번호
        var itemno = 0;
        //스크롤
        var scrollx;
        var scrolly;
        //타일(배경)
        var $tile = $scope.data.tile.split(" ");
        var $object = $scope.data.object.split(" ");

        //마우스가 클릭할 때
        $("canvas").on("mousedown", function () {
            mousedown();
        });
        $("canvas").on("mousemove", function () {
            mousemove();
        });
        $("canvas").on("mouseup", function (event) {
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
            if (set) {
                var mouse = {
                    x: event.offsetX,
                    y: event.offsetY
                }
                tiledraw(mouse.x, mouse.y);
            }
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
        
        //기본 룸 설정
        $scope.room = function() {
            $(".inBox").height($(".inBox").width() / 5 * 2.2 + "px");
            $("#myCanvas").attr("width", 100 * 64 + "px");
            $("#myCanvas").attr("height", 100 * 64 + "px");
            wd = $("#myCanvas").width();
            hd = $("#myCanvas").height();
            
            $("#myhover").attr("width", wd);
            $("#myhover").attr("height", hd);
            $("#mysetline").attr("width", wd);
            $("#mysetline").attr("height", hd);
            $("#myobject").attr("width", wd);
            $("#myobject").attr("height", hd);
            
        	
            setting($tile);
            setting($object);
        }
        function setting(data){
        	 $.each(data, function (index, value) {
                 var y = (index - (index % 64)) / 64;
                 var x = (index - (y * 64));
                 
                 if (value != 0) {
                 	$.each($scope.inven.data, function (i, result) {
         	     		if(result.itemno == value){
         	     			var image = new Image();
                             image.src = value + ".png";
                             if(data == $tile){
                            	 background.drawImage(image, x * (wd / 64), y * (wd / 64), result.wd, result.hd);
                             }else if(data == $object){
                            	 object.drawImage(image, x * (wd / 64), y * (wd / 64), result.wd, result.hd);
                             }
         	     		}  
                 	});
                 }
             });
        }
        $scope.room();
        $(".zoom-out").click(function () {
            if (zoomout) {
                zoomout = false;
                $("#myCanvas").css("-webkit-transform", "none");
                $("#myobject").css("-webkit-transform", "none");
                $(".zoom-out").text("전체보기");
            } else {
                zoomout = true;
                $("#myCanvas").css("-webkit-transform", "scale(0.2)");
                $("#myobject").css("-webkit-transform", "scale(0.2)");
                $(".inBox").scrollLeft(0);
                $(".inBox").scrollTop(0);
                set = false;
                $(".set").text("편집 OFF");
                $(".tab-content img").css("border", "none");
                $("#myCanvas").css("cursor", "move");
                $scope.room();
                $(".zoom-out").text("원래대로");

            }

        });

        $scope.imgivent = function(index) {
        	itemno = $scope.inven.data[index].itemno;
        	type = $scope.inven.data[index].type;
        	tilewd = $scope.inven.data[index].wd;
        	tilehd = $scope.inven.data[index].hd;
            if (!set) {
                set = true;
                $(".set").text("편집 ON");
                setline();
                $("#myCanvas").css("cursor", "pointer");   
            }
        }
        
        //편집모드 가이드 
        function tiledraw(x, y) {
            var px = x - (x % (wd / 64));
            var py = y - (y % (wd / 64));
            
            var image = new Image();
            image.src = itemno + ".png";
            if(type == 1){
            	$tile[(py / (wd / 64)) * 64 + px / (wd / 64)] = itemno;
            	background.clearRect(px, py, tilewd, tilehd);
            	background.drawImage(image, px, py, tilewd, tilehd);
            }else if(type == 2){
            	$object[(py / (wd / 64)) * 64 + px / (wd / 64)] = itemno;
            	object.clearRect(px, py, tilewd, tilehd);
            	object.drawImage(image, px, py, tilewd, tilehd);
            }
            
        }

        $(".set").click(function () {
            if (!set && !zoomout) {
                set = true;
                $(".set").text("편집 ON");
                $("#myCanvas").css("cursor", "pointer");
                setline();
            } else {
                set = false;
                $(".set").text("편집 OFF");
                $(".tab-content img").css("border", "none");
                $("#myCanvas").css("cursor", "move");
                myinterface.beginPath();
                myinterface.translate(-0.5, -0.5);
                myinterface.clearRect(0,0,wd,hd);
                myinterface.closePath();
                var uptile = "";
                var upobject = "";
                $.each($tile, function (index, value) {
                	uptile += value + " ";
                });
                $.each($object, function (index, value) {
                	upobject += value + " ";
                });
               $http.post("uptile", "", {params: {tile : uptile, object : upobject, kkono : $rootScope.user.kkono}})
 	           .then(function(result){ // 성공하면 오는 곳
	 	        	  if(result.data.msg){
	 	 	     		alert(result.data.msg);
	 	 	     	}
	 	          }, function(result){ // 실패(오류) 하면 오는 곳
	 	            console.log(result);
	 	       });
            }
        });
        
        function setline() {
        	myinterface.beginPath();
        	myinterface.translate(0.5, 0.5);
            for (var j = wd / 64; j <= wd; j = j + wd / 64) {
            	myinterface.moveTo(j, 0);
                myinterface.lineTo(j, wd);
                myinterface.moveTo(0, j);
                myinterface.lineTo(wd, j);
            }
            myinterface.stroke();
            myinterface.closePath();
        }
	}
	
	$scope.draw = function(){
		var canvas = document.getElementById("myline");
	    var canvas2 = document.getElementById("mydraw");
	    //테두리 설정
	    var line = canvas.getContext("2d");
	    //그림 그려지기 설정
	    var draw = canvas2.getContext("2d");
	    //그리기 모드 false
	    var drawbool = false;
	    var eraserbool = false;
	    var eraser = false;
	    //마우스 x / y 선언
	    var preX, preY;
	    //캔버스 가로
	    var wd = $("#myline").attr("width");
	    //캔버스 새로
	    var hd = $("#myline").attr("height");

	    function drawline() {
	        line.translate(0.5, 0.5);
	        for (var j = 10; j <= wd; j = j + 10) {
		        for (var i = 10; i <= hd; i = i + 10) {
		            line.moveTo(j, 0);
		            line.lineTo(j, hd);
		            line.moveTo(0, i);
		            line.lineTo(wd, i);
		        }
	        }
	        line.stroke();
	    }
	    drawline();

	    //마우스가 왼쪽 클릭할 때
	    canvas2.addEventListener("mousedown", mousedown, false);
	    //마우스가 왼쪽 버튼을 땔 때 
	    canvas2.addEventListener("mouseup", mouseup, false);
	    //마우스가 움직일 때
	    canvas2.addEventListener("mousemove", mousemove, false);

	    //마우스가 왼쪽 클릭할 때
	    function mousedown(event) {
	       if(eraser != true){
		        //캔버스 기준
	    	    drawbool = true;
		        preX = event.offsetX;
		        preY = event.offsetY;
		        pixel(preX, preY);
	       }else if(eraser){
	    	   eraserbool = true;
	    	   preX = event.offsetX;
		       preY = event.offsetY;
		       cleanpixel(preX, preY);
	       }

	    }
	    //마우스가 왼쪽 버튼을 땔 때 
	    function mouseup(event) {
	        //그리기 모드 false
	        drawbool = false;
	        eraserbool = false;
	    }
	    //마우스가 움직일 때
	    function mousemove(event) {
	        //그리기모드 온일 때 마우스가 움직이면
	    	if (drawbool == true) {
	            preX = event.offsetX;
	            preY = event.offsetY;
	            pixel(preX, preY);
	/*            var myImage = document.getElementById('exdraw');*/
	           /* myImage.src = */
	        }else if(eraserbool == true){
	            preX = event.offsetX;
	            preY = event.offsetY;
	            cleanpixel(preX, preY);
	        }
	    }
	    

	    function pixel(x, y) {
	        var px = x - (x % 10);
	        var py = y - (y % 10);
	        draw.fillStyle = $(".dx-texteditor-input").val();
	        draw.fillRect(px, py, 10, 10);
	    }
	    function cleanpixel(x, y) {
	        var px = x - (x % 10);
	        var py = y - (y % 10);
	        draw.clearRect(px, py, 10, 10);
	    }

	    $(".clear").click(function () {
	    	drawbool = false;
	        eraserbool = false;
	    	draw.clearRect(0,0,wd,hd);
	    });
	    $(".eraser").click(function () {
	    	eraser = true;
	    });
	    $(".pen").click(function () {
	    	eraser = false;
	    });
	    $(".save").click(function(){
	    	$scope.item.data = canvas2.toDataURL();
	    	$scope.item.wd = wd;
	    	$scope.item.hd = hd;
	    });
	    $("#color-box-with-change-value").dxColorBox({
	    	height:"50px",
	        width : "200px",
	    	value: "#000000",
	        applyValueMode: "instantly",
	        onValueChanged: function (e) {
	            $(".color-block").css("background-color", e.component.option("value"));
	        },
	        onInput: function(e) {
	            $(".color-block").css("background-color", e.event.target.value);
	        }
	    });
	    $('#width').click(function(){
	    	var imgData=draw.getImageData(0,0,wd,hd);   	
	    	$('#myline').attr("width",100 * $('#width').val());
	    	$('#mydraw').attr("width",100 * $('#width').val());
	    	draw.putImageData(imgData,0,0);
	    	wd = $("#myline").attr("width");
	    	drawline();
	    });
	    
	    $('#height').click(function(){
	    	var imgData=draw.getImageData(0,0,wd,hd);  
	    	$('#myline').attr("height",100 * $('#height').val());
	    	$('#mydraw').attr("height",100 * $('#height').val());
	    	draw.putImageData(imgData,0,0);
	    	hd = $("#myline").attr("height");
	    	drawline();
	    });
	}
	
	$scope.tabEvent = function(index){
		$scope.tabActive = index;
	}
	
	
	setTimeout(function(){
		$scope.draw();
	}, 100);
	
	
});
