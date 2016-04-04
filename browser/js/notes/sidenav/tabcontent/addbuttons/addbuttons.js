app.directive('addnotebook', function () {

    return {
        restrict: 'E',
        templateUrl: 'js/notes/sidenav/tabcontent/addbuttons/addnotebook.html',
        controller: 'SidenavCtrl'
    };

});

app.directive('addnote', function () {

    return {
        restrict: 'E',
        templateUrl: 'js/notes/sidenav/tabcontent/addbuttons/addnote.html',
        controller: 'SidenavCtrl'

    };

});