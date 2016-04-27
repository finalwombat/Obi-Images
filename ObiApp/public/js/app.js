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
     //Holds the names and images of all galleries
     this.galleries = [];
     
     //Thumbnails for each folder
     this.thumbnails = [];
     
      // the current selected folder and the images that belong to it.
     this.currentFolder = {};
     
     // Get the galleries from the server and assign valuse to service properties
     // returns true when finished
     
     this.init = function(){
        
        
        //Get all galleries from server return promise that resolves thumbnail objects for
        //the galleries page. updates the galleries property aswell
        var getGalleries = function() {
            return new Promise(function(resolve, reject){
                
                $http.get('/galleries').then(function(data) {
                    
                    resolve(JSON.parse(data.data));
                    
            }, function(err)
            {
                console.log("ERROR", err);
                reject(err);
            });
                
            }); 
        
        };
        
        //Get the galleries from server than initalise properties
        getGalleries().then(function(data){
            console.log('init');
            setGalleries(data);
            setCurrentFolder('featured');
            setThumbnails(self.galleries);
        })
         
     };
     
     //set the galleries property 
     var setGalleries = function(data){
         console.log('setGalleries')
         self.galleries = data;
         console.log(self.galleries);
     }
     
    var setThumbnails = function(data){
        console.log('setThumbnails');
        self.thumbnails = data.map(function(gallery){
                            return ({title: gallery.title, 
                                    thumbnail: getThumbnailUrl(gallery.photos[0])});
         });
          console.log(self.thumbnails);
    }
     
     //Set the current folder to be viewed in the viewer
     var setCurrentFolder = function(title){
         console.log('setCurrentFolder');
         console.log(self.galleries);
         self.currentFolder.title = title;
         album = self.galleries.filter(function(album){
             return album.title === title;
         })
         self.currentFolder.photos = album[0].photos;
         console.log('SetCurrentFolder after');
         console.log(self.currentFolder);
     }
     
     //create thumbnail version of url
     var getThumbnailUrl = function(url){
         return url.replace('.jpg', '_q.jpg');
     }
  
    this.test = 'test';
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
     
     Images.init();
     console.log(Images)
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