
var config = {
    apiKey: "AIzaSyC9DzE_EIn5TkTXiviMfOoN7T-u4M-ztjs",
    authDomain: "temp-623da.firebaseapp.com",
    databaseURL: "https://temp-623da.firebaseio.com",
    projectId: "temp-623da",
    storageBucket: "temp-623da.appspot.com",
    messagingSenderId: "146987796986"
};
firebase.initializeApp(config);

// **************Fetching Data from Local storage*************
const databaseRef = firebase.database().ref();
var dispName = document.getElementById('nameContainer');
var user = localStorage.getItem("user");
user = JSON.parse(user);
databaseRef.child('users').child(user.uid).once('value')
    .then(function (user) {
        dispName.innerHTML = user.val().name;
    })
    .catch(function (error) {
        console.log(error);
    });



// *************************   todo functionality ************
var field = document.getElementById('inputField');
document.getElementById('btnAdd').addEventListener('click', function () {
    if (field.value) {
        databaseRef.child("users").child(user.uid).child("todoList").push(field.value);
        display(field.value, user.uid);
        field.value = "";
        field.focus();
    }
});




databaseRef.child("users").child(user.uid).child("todoList").once('value').then(function (snapshot) {
    var data = snapshot.val()
    for (key in data) {
        display(data[key], key);
    }
});


const container = document.getElementById('todoContainer');
function display(text, uid) {
    var parant = document.createElement('li');
    parant.setAttribute('class', 'my-4');
    var deletButton = document.createElement('button');
    deletButton.setAttribute('class', 'btn btn-danger btn-sm ml-5');
    deletButton.appendChild(document.createTextNode('Delete'));
    parant.setAttribute('id', uid);
    deletButton.setAttribute('onclick', `deleteItem('${uid}')`);
    var firstChild = document.createTextNode(text);
    parant.appendChild(firstChild);
    parant.appendChild(deletButton);
    container.appendChild(parant);

}
function deleteItem(id) {
    var nodeToRemove = document.getElementById(id);

    container.removeChild(nodeToRemove);
    var ref = databaseRef.child(`/users/${user.uid}/todoList/${id}`).remove()

}

document.querySelector('#logoutBtn').addEventListener('click', function () {
    localStorage.clear();
    firebase.auth().signOut();
    window.location.replace('./index.html');
});