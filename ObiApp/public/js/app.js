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

//keep the state of the current folder
imagesApp.service('CurrentFolder', [function(){
    this.currentFolderName = 'featured';
}])


//Images service -- 
imagesApp.service('Images', ['$http', function($http) {
    
     var self = this;   
        
     //[Promise] Get all images from server, 
     this.getThumbnails = function() {
         return new Promise(function(resolve, reject){
                
             $http.get('/galleries').then(function(data) {
                 var thumbnails = JSON.parse(data.data).map(function(gallery){
                            return ({title: gallery.title, 
                                    thumbnail: getThumbnailUrl(gallery.photos[0])});
                 });
                 resolve(thumbnails);
                    
         }, function(err)
         {
             console.log("ERROR", err);
             reject(err);
         });
                
         }); 
        
     };
     
     //[Promise] Set the current folder to be viewed in the viewer
     this.getAlbumImages = function(title){
         return new Promise(function(resolve, reject){
             var url = '/album' + title;
             $http.get(url).then(function(data){
                    resolve(JSON.parse(data.data));
         })
       
     })
     }
     
     //create thumbnail version of url
     var getThumbnailUrl = function(url){
         return url.replace('.jpg', '_q.jpg');
     }
  
    
}])



//Controllers

imagesApp.controller('viewerController', ['$scope', 'Images', function($scope, Images) {
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
    
    $scope.name = Images.currentFolder.name;
    
}]);



imagesApp.controller('galleryController', ['$scope', 'Images', function($scope, Images) {
     
     Images.getThumbnails().then(function(data){
         console.log(data);
     });
     Images.getAlbumImages('featured').then(function(data){
         console.log(data);
     })
     /*Images.getGalleries().then(function(galleries){
      $scope.thumbnails = galleries;
      $scope.$apply();
  });
  
    $scope.galleries = Images.galleries;
    
  
    $scope.selectFolder = function(name){
        Images.setCurrentFolder(name);
        
    }*/
}]);

imagesApp.controller('contactController', ['$scope', 'Images', function($scope, Images) {
    
 
  
    
}]);