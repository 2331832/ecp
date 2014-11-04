var userModule = angular.module("UserModule", []);
userModule.controller('loginCtrl',//登录
		function($rootScope,$scope, $http, $state, $stateParams) {
			$scope.data = {username:"admin",password:"123456",vcode:"1234"};
			$scope.vcodeImg="/ValidCode";
			$scope.submit = function() {
				if ($scope.data.username == "" || $scope.data.password == "") {
					$rootScope.alertMsgList.push({text:"用户名、密码、验证码为必填！请填写！",type:"warning"});
					return;
				}
				$rootScope.loading=true;
				$http.post(rootPath + "/login.json", $scope.data).success(
					function(json,status) {
						$rootScope.loading=false;
						if(json.success==false){
							$rootScope.alertMsgList.push({text:json.msg,type:"warning"});
							$scope.c+=1;
							$scope.data.vcode="";
						}else{
							$http.post("qryLoginInfo.json",{}).success(function(json,status){
						    	if(json.status==200){
						    		$rootScope.userInfo=json.data;
						    	}else{
						    		window.location='#/';
						    	}
						    });
							$rootScope.alertMsgList.push({text:"欢迎 "+$scope.data.username,type:"success"});
							window.location="#/home";
						}
					}).error(function(data,status) {
						$rootScope.loading=false;
						$rootScope.alertMsgList.push({text:"网络链接错误！状态码："+status,type:"danger"});
					});
			}
		});
userModule.controller('mainCtrl',//首页
		function($rootScope,$scope, $http, $state, $stateParams) {
			$http.post(rootPath+"/notice/dataGrid.json",{pageSize:10,page:1}).success(function(json,status){
				$scope.noticePage=json.data;
				$rootScope.loading=false;
			});
		});
