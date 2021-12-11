import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";
import { firebaseApp } from '../lib/firebase'

export async function getUserDataById(userId) {
    
    const db = getFirestore(firebaseApp)
    let userData = {}

    const q = query(collection(db, "users"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        userData = doc.data() // in this case the query is know to return only one value
    });

    return userData;
}
