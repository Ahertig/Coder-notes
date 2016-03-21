app.controller('NavbarCtrl', function($scope, NotesFactory, AuthService, $rootScope) {

    // this piece is not working.
    // how to get current notes that are in a parent scope?

    $scope.notes = [
    {
        "subject": "dolor, nonummy ac,",
        "body": "sollicitudin commodo ipsum. Suspendisse non leo. Vivamus nibh dolor, nonummy ac, feugiat non, lobortis quis, pede. Suspendisse dui. Fusce diam nunc, ullamcorper eu, euismod ac, fermentum vel, mauris. Integer sem elit, pharetra ut, pharetra sed, hendrerit a, arcu. Sed et libero. Proin mi. Aliquam gravida mauris ut mi. Duis risus odio, auctor vitae, aliquet nec, imperdiet nec, leo. Morbi neque tellus, imperdiet non, vestibulum nec, euismod in, dolor. Fusce feugiat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam auctor, velit eget laoreet posuere, enim nisl elementum purus, accumsan interdum",
        "size": 55,
        "tags": ["orange"],
        "dateCreated": "1443597123",
        "lastUpdate": "1436909663"
    },
    {
        "subject": "nec mauris blandit",
        "body": "sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu imperdiet ullamcorper. Duis at lacus. Quisque purus sapien, gravida non, sollicitudin a, malesuada id, erat. Etiam vestibulum massa rutrum magna. Cras convallis convallis dolor. Quisque tincidunt pede ac urna. Ut tincidunt vehicula risus. Nulla eget metus eu erat semper rutrum. Fusce dolor quam, elementum at, egestas a, scelerisque sed, sapien. Nunc pulvinar arcu et pede. Nunc sed orci lobortis augue scelerisque mollis. Phasellus libero mauris, aliquam eu, accumsan sed, facilisis vitae, orci. Phasellus dapibus quam quis diam. Pellentesque",
        "size": 95,
        "tags": ["yellow"],
        "dateCreated": "1431964328",
        "lastUpdate": "1426507385"
    },
    {
        "subject": "eu, euismod ac,",
        "body": "congue. In scelerisque scelerisque dui. Suspendisse ac metus vitae velit egestas lacinia. Sed congue, elit sed consequat auctor, nunc nulla vulputate dui, nec tempus mauris erat eget ipsum. Suspendisse sagittis. Nullam vitae diam. Proin dolor. Nulla semper tellus id nunc interdum feugiat. Sed nec metus facilisis lorem tristique aliquet. Phasellus fermentum convallis ligula. Donec luctus aliquet odio. Etiam ligula tortor, dictum eu, placerat eget, venenatis a, magna. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam laoreet, libero et",
        "size": 89,
        "tags": ["red"],
        "dateCreated": "1451088738",
        "lastUpdate": "1442746785"
    }];

    $scope.newNote = function() {
        return AuthService.getLoggedInUser()
        .then(function(user) {
          return NotesFactory.newNote(user._id);
        }, function(err) {
            console.error("Error retrieving user!", err)
        })
        .then(function(newNote) {
            console.log('here is the new note?', newNote)
          $rootScope.currentNote = newNote;
        })
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