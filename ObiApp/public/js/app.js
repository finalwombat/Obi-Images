(function(){


  var initApp = function(){

    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyBHwexY6tsjCsXFFaUHOnOnWbr7FpzTRmE",
      authDomain: "login-test-27aba.firebaseapp.com",
      databaseURL: "https://login-test-27aba.firebaseio.com",
      storageBucket: "login-test-27aba.appspot.com",
      messagingSenderId: "717814192522"
    };
    firebase.initializeApp(config);

    // FirebaseUI config.
    var uiConfig = {
      signInSuccessUrl: '/admin',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        //firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        //firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID

      ],
      credentialHelper: firebaseui.auth.CredentialHelper.NONE
    };

    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());

    // The start method will wait until the DOM is loaded.
    if(document.getElementById('firebaseui-auth-container')) {
      ui.start('#firebaseui-auth-container', uiConfig);
    }


    firebase.auth().onAuthStateChanged(function(user){
      if(user){
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var uid = user.uid;
        var providerData = user.providerData;
        user.getToken().then(function(accessToken) {
          var menuLogin = document.getElementById('menuLogin');
          menuLogin.textContent = 'Sign out';
          menuLogin.href = '/';
          menuLogin.addEventListener('click', function(){
            firebase.auth().signOut();
          })
          console.log( JSON.stringify({
            displayName: displayName,
            email: email,
            emailVerified: emailVerified,
            photoURL: photoURL,
            uid: uid,
            accessToken: accessToken,
            providerData: providerData
          }, null, '  '));
        });
      }else {
        var menuLogin = document.getElementById('menuLogin');
        menuLogin.textContent = 'LOGIN';
        menuLogin.href = '/login';
      }
    })
  }
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

window.addEventListener('load', function(){
  initApp();
  setActiveMenu();
  setActiveImage();
})




})()
