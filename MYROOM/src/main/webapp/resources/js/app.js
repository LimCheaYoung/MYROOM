// 앵귤라 모듈 만들기
var app = angular.module("myApp", ["ngRoute","MyRoom","MyFriend","MyShop"]);
		
// 라우터 처리 부분 (싱글 페이지 적용)
app.config(function($routeProvider){
	$routeProvider.when("/", {
		templateUrl : "resources/html/home.html",
		controller : "myroom"
	}).when("/shop", {
		templateUrl : "resources/html/shop.html",
		controller:"myshop"
	}).when("/friend", {
		templateUrl : "resources/html/friend.html",
		controller:"myfriend"
	}).otherwise({redirectTo: "/"});
});

app.run(function($rootScope, $http){
	$rootScope.loginbool = false;
	$rootScope.user = {};
	$rootScope.nav = "resources/html/nav.html";
	$rootScope.navEvent = function(){
	      $rootScope.navDis = location.hash;
	}
	$rootScope.logout = function(){
			Kakao.cleanup();
			$http.post("logout")
	        .then(function(result){ // 성공하면 오는 곳
	        	console.log(result);
	        	$rootScope.user = {};
	        	$rootScope.loginbool = false;
	         }, function(result){ // 실패(오류) 하면 오는 곳
		         console.log(result);
		    });
		
	}
	
	$rootScope.footer = "resources/html/footer.html";
});

//서비스
app.factory("LoginService", function($q, $http,$rootScope){
      var deffered = $q.defer();
      var result = [];
      var LoginService = {};
      
      // 실행하는 부분
      LoginService.async = function() {
         $http.post("session", "", {params: $rootScope.user}).then(data => {
             result = data;
             deffered.resolve();
         }, data => {
            result = data;
             deffered.resolve();
         });
         return deffered.promise;
      }
      
      // 데이터 리턴하는 부분
      LoginService.data = function(){ 
         return result; 
      }
      
      return LoginService;
   });