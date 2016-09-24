function login(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(){
        var user = firebase.auth().currentUser;
        var name, email, photoUrl, uid;
        if (user != null && user.admin == true) {
            name = user.displayName;
            email = user.email;
            photoUrl = user.photoURL;
            uid = user.uid;
            alert("Welcome back!");
            console.log(user.id);
            window.location.replace('/manage/')
        } else {
            alert("please email developfintech@gmail.com to get admin authorized. Bye...");
            window.location.replace('/');
        }
    }).catch(function (error) {
        // Handle Errors here.
        alert(error.code + " | " + error.message);
    });
}
