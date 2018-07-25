
var config = {
    apiKey: "AIzaSyC9DzE_EIn5TkTXiviMfOoN7T-u4M-ztjs",
    authDomain: "temp-623da.firebaseapp.com",
    databaseURL: "https://temp-623da.firebaseio.com",
    projectId: "temp-623da",
    storageBucket: "temp-623da.appspot.com",
    messagingSenderId: "146987796986"
};
firebase.initializeApp(config);

const databaseRef = firebase.database().ref();
const loginButton = document.getElementById('btnLogin');
const signUpButton = document.getElementById('signUpButton');

/***************** setting Data to dataBase *****************/ 
window.addEventListener('load', function () {
    localStorage.clear
})
function getUserData(uid) {
    databaseRef.child('users').child(uid).once("value").then(function (user) {
            console.log( user.val());
            var userObject = {
                name: user.val().name,
                email: user.val().email,
                uid: user.val().uid
            };

            localStorage.setItem("user", JSON.stringify(userObject));
            window.location.replace('./todo.html');
            email = "";

        }).catch(function (error){
            console.log(error);
        });
}

    // **************saving data to database ************************
function saveDataToDatabase(userId, userObject) {
    databaseRef.child('users').child(userId).set(userObject);
}

// ******************** login Button event Binding****************
loginButton.addEventListener('click', function () {
    var email = document.getElementById('userEmail').value;
    var password = document.getElementById('userPassword').value;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function (data) {
            getUserData(data.uid);
            
        })
        .catch(function (error) {
            document.getElementById('content-modal').innerHTML = error;
          $('#myCustomModal').modal('show');
        });

})

//*****************Sign up Button Event binding ****************** 
signUpButton.addEventListener('click', function () {
    
    var email = document.getElementById('uId').value;
    var password = document.getElementById('uPassword').value;
    var name = document.getElementById('uName').value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function (data) {
            var userObject = { name: name, email: email, uid : data.uid };
            console.log(data.uid);
            saveDataToDatabase(data.uid, userObject);
            localStorage.setItem("user", JSON.stringify(userObject));
            window.location.replace( './todo.html');

        })
        .catch(function (error) {
            document.getElementById('content-modal').innerHTML = error;
            $('#myCustomModal').modal('show');
        })


});
