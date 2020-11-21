const auth = firebase.auth();

const whenSignedIn = document.getElementById("whenSignedIn");
const whenSignedOut = document.getElementById("whenSignedOut");
const signInBtn = document.getElementById("signInBtn");
const signOutBtn = document.getElementById("signOutBtn");
const userDetails = document.getElementById("userDetails");

const provider = new firebase.auth.GoogleAuthProvider();

signInBtn.onclick = () => {
  console.log("REACHED!!!");
  auth.signInWithPopup(provider);
};
signOutBtn.onclick = () => auth.signOut();

auth.onAuthStateChanged((user) => {
  if (user) {
    whenSignedIn.hidden = false;
    whenSignedOut.hidden = true;
    userDetails.textContent = JSON.stringify(user, null, 2);
  } else {
    whenSignedIn.hidden = true;
    whenSignedOut.hidden = false;
  }
});

//console.log(firebase);
