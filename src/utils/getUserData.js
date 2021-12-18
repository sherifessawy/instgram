import { collection, query, where, getDocs, getFirestore, limit } from "firebase/firestore";
import { firebaseApp } from '../lib/firebase'

export async function getUserDataById(userId, isIncluded=true) {
    // this function is used for 2 puposes: the firist is to get auth user data and in that case we get only
    // one value back from firestore and we return the object by returning userData[0] and not the complete array
    //the secon one is to get suggestions for the user for peaople to follow and in that case we get array of many users 
    //that we retun to the useSuggesteUsers hook for post processing

    const db = getFirestore(firebaseApp)
    let userData = []
    const q = isIncluded ? 
        query(collection(db, "users"), where("userId", "==", userId)) //returns array of a user with specific userId
        : query(collection(db, "users"), where("userId", "not-in", userId),  limit(4)) //returns array of max 4 users with userId that is not === the parameter userId (used to get suggested people to follow)
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        userData.push(doc.data()) 
    });

    return userData; 
}
