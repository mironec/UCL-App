angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])

.factory('LoginService', [function(){
	var loggedIn = false;
	var loginToken = ""; 

	return {
		isLoggedIn: function(){return loggedIn;},
		setLoggedIn: function(bool){loggedIn = bool; return this;},
		getLoginToken: function(){return loginToken;}
	}
}])

/*.service('LoginService', function(){
	return {
		loggedIn: false,
		loginToken: ""
	}
})*/;

