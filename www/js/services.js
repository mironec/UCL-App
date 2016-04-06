angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])

.factory('LoginService', ['$http','$rootScope',function($http,$rootScope){
	var loggedIn = false;
	var loginToken = ""; 

	return {
		isLoggedIn: function(){return loggedIn;},
		setLoggedIn: function(bool){loggedIn = bool; return this;},
		getLoginToken: function(){return loginToken;},
		login: function(deferred, email, pass){
			$http.post($rootScope.backendLoginUrl,{email: email, pass: pass}).then(
				function(response){
					if(!(response instanceof Object)) {deferred.reject(); return;}
					var data = response.data;
					if(data.startsWith("S ")){
						loggedIn = true;
						loginToken = data.substring(2);
						deferred.resolve();
					}
					else{
						loggedIn = false;
						loginToken = "";
						deferred.reject(data.substring(2));
					}
				},
				function(reject){deferred.reject("Check your internet connection.");}
			);
		}
	}
}])

/*.service('LoginService', function(){
	return {
		loggedIn: false,
		loginToken: ""
	}
})*/;

