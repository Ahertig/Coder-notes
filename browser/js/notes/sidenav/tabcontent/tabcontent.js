app.directive('notestab', function () {

    return {
        restrict: 'E',
        templateUrl: 'js/notes/sidenav/tabcontent/notestab.html',
        controller: 'SidenavCtrl'
    };

});

app.directive('notebooktab', function () {

    return {
        restrict: 'E',
        templateUrl: 'js/notes/sidenav/tabcontent/notebooktab.html',
        controller: 'SidenavCtrl'

    };

});

app.directive('tagstab', function () {

    return {
        restrict: 'E',
        templateUrl: 'js/notes/sidenav/tabcontent/tagstab.html',
        controller: 'SidenavCtrl'
    };

});

app.directive('sharedtab', function () {

    return {
        restrict: 'E',
        templateUrl: 'js/notes/sidenav/tabcontent/sharedtab.html',
        controller: 'SidenavCtrl'
    };

});

app.directive('trashtab', function () {

    return {
        restrict: 'E',
        templateUrl: 'js/notes/sidenav/tabcontent/trashtab.html',
        controller: 'SidenavCtrl'
    };

});