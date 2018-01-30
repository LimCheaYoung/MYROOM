<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false"%>
<html data-ng-app="myApp">
<head>
<title>home</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="//developers.kakao.com/sdk/js/kakao.min.js"></script>
<link rel="stylesheet" type="text/css" href="resources/css/dx.common.css" />
<link rel="dx-theme" data-theme="generic.light" href="resources/css/dx.light.css" />
<link rel="stylesheet" href="resources/css/home.css">

<script type="text/javascript" src="resources/angular/angular.min.js"></script>
<script type="text/javascript" src="resources/angular/angular-route.min.js"></script>
<script type="text/javascript" src="resources/js/dx.all.js"></script>
<script type="text/javascript" src="resources/js/app.js"></script>
<script type="text/javascript" src="resources/js/myroom.js"></script>
<script type="text/javascript" src="resources/js/friend.js"></script>
<script type="text/javascript" src="resources/js/shop.js"></script>
</head>
<body>
	<div data-ng-include="nav"></div>
	<div class="container-fluid sbody" data-ng-view></div>
	<footer class="text-center" data-ng-include="footer"></footer>
	<div style="display: none;">
		<img data-ng-src="resources/item/{{row.itemno}}.png" data-ng-repeat="row in items">
	</div>
</body>
</html>
