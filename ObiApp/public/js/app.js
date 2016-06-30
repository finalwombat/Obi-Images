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
    this.name = 'featured';
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
                    //convert albums urls to the correct size
                    var album = JSON.parse(data.data);
                    var photos = album.photos.map(function(photo){
                        return getViewerUrl(photo);
                    })
                    resolve(photos);
         })
       
     })
     }
     
     //create thumbnail version of url
     var getThumbnailUrl = function(url){
         return url.replace('.jpg', '_q.jpg');
     }
     
     //create viewer version of url
     var getViewerUrl = function(url){
         return url.replace('.jpg', '_z.jpg');
     }
  
    
}])



//Controllers

imagesApp.controller('viewerController', ['$scope', 'Images', 'CurrentFolder', function($scope, Images, CurrentFolder) {
    
    $scope.name = CurrentFolder.name;
    
    Images.getAlbumImages($scope.name).then(function(data){
        $scope.images = data;
        $scope.$apply();
    })
    
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



imagesApp.controller('galleryController', ['$scope', 'Images', 'CurrentFolder', function($scope, Images, CurrentFolder) {
     
     Images.getThumbnails().then(function(data){
         $scope.thumbnails = data;
         $scope.$apply();
     });
     /*
     Images.getAlbumImages('featured').then(function(data){
         console.log(data);
     })
     /*Images.getGalleries().then(function(galleries){
      $scope.thumbnails = galleries;
      $scope.$apply();
  });
  
    $scope.galleries = Images.galleries;
    
  */
    $scope.selectFolder = function(title){
        CurrentFolder.name = title;
    }
}]);

imagesApp.controller('contactController', ['$scope', 'Images', 'CurrentFolder', function($scope, Images, CurrentFolder) {
    
 // Using the contact page for testing
    $scope.name = CurrentFolder.name;
    
    Images.getAlbumImages($scope.name).then(function(data){
        $scope.images = data;
        $scope.$apply();
    })
  
    
}]);