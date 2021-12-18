import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";
import { firebaseApp } from '../lib/firebase'



export async function FollowedUsersPosts(followedUserId){
    //queries the database and returns posts for followed users only
    const db = getFirestore(firebaseApp)
    let postData = []

    const q = query(collection(db, "photos"), where("userId", "==", followedUserId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        postData.push(doc.data()) 
    });

    return postData;
}
 
export async function profilePosts(followedUserId){
    //queries the database and returns posts for followed users only
    const db = getFirestore(firebaseApp)
    let postData = []

    const q = query(collection(db, "photos"), where("userId", "==", followedUserId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        postData.push(doc.data()) 
    });

    return postData;
}