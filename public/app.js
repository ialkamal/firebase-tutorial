const auth = firebase.auth();
const db = firebase.firestore();

const whenSignedIn = document.getElementById("whenSignedIn");
const whenSignedOut = document.getElementById("whenSignedOut");
const signInBtn = document.getElementById("signInBtn");
const signOutBtn = document.getElementById("signOutBtn");
const userDetails = document.getElementById("userDetails");
const createThing = document.getElementById("createThing");
const thingsList = document.getElementById("thingsList");

let thingsRef;
let unsubscribe;

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
    thingsRef = db.collection("things");
    createThing.onclick = () => {
      const { serverTimestamp } = firebase.firestore.FieldValue;
      thingsRef.add({
        uid: user.uid,
        name: faker.commerce.productName(),
        createdAt: serverTimestamp(),
      });

      unsubscribe = thingsRef
        .where("uid", "==", user.uid)
        .onSnapshot((querySnapshot) => {
          const items = querySnapshot.docs.map((doc) => {
            return `<li>${doc.data().name}</li>`;
          });
          thingsList.innerHTML = items.join("");
        });
    };
  } else {
    whenSignedIn.hidden = true;
    whenSignedOut.hidden = false;
    unsubscribe && unsubscribe();
  }
});

//console.log(firebase);
