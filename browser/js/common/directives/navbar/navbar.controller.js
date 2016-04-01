app.controller('NavbarCtrl', function($scope, $state, NotesFactory,AuthService) {

    $scope.setCurrentNote = NotesFactory.setCurrentNote;

    $scope.getNotes = function(){
      $scope.notes = NotesFactory.getAllCacheNotes();
    }

    $scope.search = function(searchTerm) {
        $state.go('community', {searchTerm: searchTerm})
    }

 });
app.filter('trunc', function () {
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                    value = value.substr(0, lastspace);
                }
            }

            return value + (tail || '...');
    };
});


