// 앵귤라 모듈 만들기
var app = angular.module("myApp", ["ngRoute","MyRoom"]);
		
// 라우터 처리 부분 (싱글 페이지 적용)
app.config(function($routeProvider){
	$routeProvider.when("/", {
		templateUrl : "resources/html/home.html",
		controller : "myroom"
	}).otherwise({redirectTo: "/"});
});

