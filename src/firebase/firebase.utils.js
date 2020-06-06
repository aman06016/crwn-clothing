import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config={
    apiKey: "AIzaSyCPCQtm5Iz9uFfttxulM2MTyn8omEJxnEw",
    authDomain: "crwn-db-22a12.firebaseapp.com",
    databaseURL: "https://crwn-db-22a12.firebaseio.com",
    projectId: "crwn-db-22a12",
    storageBucket: "crwn-db-22a12.appspot.com",
    messagingSenderId: "828272318108",
    appId: "1:828272318108:web:363ee3da75a900d722ff59",
    measurementId: "G-3PMJC0711W"
  };

export const createUserProfileDocument= async (userAuth,additionData) => {
  if(!userAuth) return ;
  
  const userRef=firestore.doc(`users/${userAuth.uid}`);
  //const collectionRef=firestore.collection('users');
  //console.log("reference object");
  //console.log(userRef);

  const snapShot= await userRef.get();
  //const collectionSnapshot = await collectionRef.get();

  //console.log("snapshot objects");
  //console.log(snapShot);

  //console.log("snapshot data");
  //console.log(snapShot.data());

  // console.log("collection snaphot");
  // console.log(collectionSnapshot);
  // console.log(collectionSnapshot.docs.map( doc => doc.data()) );
  
  if(!snapShot.exists){
    const{displayName,email}=userAuth;
    const createdAt= new Date();

    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionData
      })
    }
    catch(error){
      console.log("error creating user",error.message);
    }
  }

  return userRef;
}

// export const addCollectionsAndDocuments = async (collectionKey,objectsToAdd) => {
//   const collectionRef = firestore.collection(collectionKey);
//   //console.log(collectionRef);

//   const batch= firestore.batch();
//   objectsToAdd.forEach(obj => {
//     const newDocRef=collectionRef.doc();
//     batch.set(newDocRef,obj);
//   });
//   return await batch.commit()
// }

export const convertCollectionsSnapShotToMap= (collections) => {
    const transformedCollection = collections.docs.map( doc =>{
      const {title,items}=doc.data();

      return{
        routeName: encodeURI(title),
        id:doc.id,
        title,
        items
      }
    } );
    //console.log(transformedCollection);
    //console.log("aman is cool");

    return transformedCollection.reduce((accumulator,collection)=>{
      accumulator[collection.title.toLowerCase()]=collection;
      return accumulator;
    },{});
}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt : 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;