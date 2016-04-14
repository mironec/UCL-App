angular.module('app.directives', [])

.directive('serviceRating', [function(){
	return {
		restrict: 'E',
		template: function(elem, attr){
			var score = parseInt(attr.rating);
			return '<div class="rating item"><span class="ratingAuthor">'+attr.name+
			'</span><span class="ratingScore">'+Array(score+1).join('★')+Array(6-score).join('☆')+'</span><br />'+
			'<hr style="opacity: 0.15;"><span class="ratingComment">'+(attr.comment||elem.text())+'</span></div>';
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

