angular.module('app.directives', [])

.directive('serviceRating', [function(){
	return {
		restrict: 'E',
		template: function(elem, attr){
			return '<div class="review"><span class="reviewName">'+attr.name+'</span><br /><span class="reviewComment">'+attr.comment||elem.text()+'</span></div>';
		}
	};
}])

.directive('compile', ['$compile', function ($compile) {
    return function(scope, element, attrs) {
        scope.$watch(
            function(scope) {
                // watch the 'compile' expression for changes
                return scope.$eval(attrs.compile);
            },
            function(value) {
                // when the 'compile' expression changes
                // assign it into the current DOM
                element.html(value);

                // compile the new DOM and link it to the current
                // scope.
                // NOTE: we only compile .childNodes so that
                // we don't get into infinite loop compiling ourselves
                $compile(element.contents())(scope);
            }
        );
    };
}])

;

