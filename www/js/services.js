angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])

.factory('LoginService', ['$http','$rootScope','$q',function($http,$rootScope,$q){
	var loggedIn = false;
	var loginToken = ""; 

	return {
		isLoggedIn: function(){return loggedIn;},
		setLoggedIn: function(bool){loggedIn = bool; if(bool==false) loginToken=""; return this;},
		getLoginToken: function(){return loginToken;},
		login: function(email, pass){
			var deferred = $q.defer();

			$http.post($rootScope.backendLoginUrl,{email: email, pass: pass}).then(
				function(response){
					if(!(response instanceof Object)) {deferred.reject(); return;}
					var data = response.data;
					if(data.substring(0,2) == "S "){
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

			return deferred.promise;
		}
	}
}])

.factory('SignupService', ['$http','$rootScope','$q',function($http,$rootScope,$q){
	return {
		signUp: function(email, pass, name, country){
			var deferred = $q.defer();

			$http.post($rootScope.backendSignupUrl,{email: email, pass: pass, name: name, country: country}).then(
				function(response){
					if(!(response instanceof Object)) {deferred.reject(); return;}
					var data = response.data;
					if(data.substring(0,2) == "S ") deferred.resolve(data.substring(2));
					else if(data.substring(0,2) == "E ") deferred.reject(data.substring(2));
					else deferred.reject(data);
				},
				function(reject){deferred.reject("Check your internet connection.");}
			);

			return deferred.promise;
		}
	}
}])

.factory('RatingService', ['$http','$rootScope','$q','LoginService',function($http,$rootScope,$q,LoginService){
	return {
		sendRating: function(serviceId, rating, comment){
			var deferred = $q.defer();

			$http.post($rootScope.backendRatingUrl,{"service_id": serviceId, rating: rating, comment: comment},{headers: {Authorization: "JWT "+LoginService.getLoginToken()}}).then(
				function(response){
					if(!(response instanceof Object)) {deferred.reject(); return;}
					var data = response.data;
					if(data.substring(0,2)=='E ') deferred.reject(data.substring(2));
					else deferred.resolve(data);
				},
				function(reject){deferred.reject("Check your internet connection.");}
			);

			return deferred.promise;
		}
	}
}])

;
