app.controller('NavbarCtrl', function($scope, NotesFactory,notesService) {

    // this piece is not working.
    // how to get current notes that are in a parent scope?
     $scope.getnotes = function(){
        $scope.notes = notesService.getallnotes();
        //console.log("this is notes,", $scope.notes);
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