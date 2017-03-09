(function(){

  window.addEventListener('load', function(){
    initApp();
  })

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

    configFirebaseUi();
    handleAuthStateChange();
    setActiveMenu();
    setActiveImage();
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

  var configFirebaseUi = function(){
    // FirebaseUI config.
    var uiConfig = {
      callbacks: {
        signInSuccess: function(currentUser, credential, redirectUrl){
          handleSignedInUser(currentUser);
          // Do not redirect
          return false;
        }
      },
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
  }

  var handleAuthStateChange = function(){

    firebase.auth().onAuthStateChanged(function(user){
      if(user){
        // User is signed in.
        var menuLogin = document.getElementById('menuLogin');
        menuLogin.textContent = 'SIGN OUT';
        menuLogin.href = '/';
        menuLogin.addEventListener('click', function(){
          firebase.auth().signOut();
        })
      } else {
        var menuLogin = document.getElementById('menuLogin');
        menuLogin.textContent = 'LOGIN';
        menuLogin.href = '/login';
      }
    });
  }

  var handleSignedInUser = function(user){
    if(user){
      firebase.auth().currentUser.getToken(true)
        .then(function(idToken){
          document.cookie = "idToken=" + idToken;
          window.location.href =  '/admin';
        }).catch(function(error){
          console.log(error);
        });

    } else {
      console.log('No User!');
    }
  }
})()
