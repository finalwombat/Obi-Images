(function(){

  // Set menu class to active
  var setActiveMenu = function(){
    var url = getURL();
    switch (url) {
      case '/':
          document.getElementById('menuHome').className = 'active'
        break;
      case '/gallery':
          document.getElementById('menuGallery').className = 'active'
        break;

      case '/contact':
          document.getElementById('menuContact').className = 'active'
        break;
      default:

    }

  }
  var getURL = function(){
    var url = window.location.href;
    var page = url.slice(21, 29);    // URL specific - will need to be changed if the length of URL changes
    return page;
  }

  var setActiveImage = function(){
    document.getElementsByClassName('container')[0].childNodes[1].className = 'img active';
  }
setActiveMenu();
setActiveImage();
})()
