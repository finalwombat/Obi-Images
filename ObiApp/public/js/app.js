var imagesApp = angular.module('imagesApp', ['ngRoute', 'ngResource']);


// Routes
imagesApp.config(function($routeProvider) {
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/viewer.ejs',
        controller: 'viewerController'
    })
    .when('/gallery', {
        templateUrl: 'pages/gallery.ejs',
        controller: 'galleryController'
    })
    .when('/contact', {
        templateUrl: 'pages/contact.ejs',
        controller: 'contactController'
    });
});

//Services
imagesApp.service('Images', ['$http', function($http) {
     var self = this;
     this.getGalleries = function(fn) {
        $http.get('/galleries').then(function(data) {
         fn(data.data);
        }, function(err)
        {
            console.log("ERROR", err);
        })
     }
}])



//Controllers

imagesApp.controller('viewerController', ['$scope', function($scope) {
    $scope.images = [
        {name: 'images/19452892101_47e82ed731_o.jpg'},
        {name: 'images/19442389322_651c6b7580_o.jpg'},
        {name: 'images/19262527899_ab4dc6f0cc_o.jpg'},
        {name: 'images/18826333504_393f58eed1_o.jpg'},
        {name: 'images/19261301330_e28eb5754d_o.jpg'}
    ];
    
    $scope.currentIndex = 0;
    
    $scope.setCurrentImageIndex = function(index){
        $scope.currentIndex = index;
    };
    
    $scope.isCurrentImageIndex = function(index){
        return $scope.currentIndex === index;
    };
    
    $scope.prevImage = function(){
        $scope.currentIndex = ($scope.currentIndex < $scope.images.length -1) ? 
            ++$scope.currentIndex : 0;
    };
    
    $scope.nextImage = function(){
        $scope.currentIndex = ($scope.currentIndex > 0) ? 
            --$scope.currentIndex : $scope.images.length -1;
    };
    
}]);

imagesApp.controller('galleryController', ['$scope', function($scope) {
        $scope.thumbnails = [
        {name: 'images/19452892101_47e82ed731_o.jpg'},
        {name: 'images/19442389322_651c6b7580_o.jpg'},
        {name: 'images/19262527899_ab4dc6f0cc_o.jpg'},
        {name: 'images/18826333504_393f58eed1_o.jpg'},
        {name: 'images/19261301330_e28eb5754d_o.jpg'}
    ];
}]);

imagesApp.controller('contactController', ['$scope', '$http', 'Images', function($scope, $http, Images) {
  
  Images.getGalleries(function(data){
      console.log(JSON.parse(data));
  })
    
}]);