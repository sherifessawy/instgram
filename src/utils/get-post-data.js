import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";
import { firebaseApp } from '../lib/firebase'



export async function FollowedUsersPosts(followedUserId = null){
    //queries the database and returns posts for followed users only
    //we initialize followedUserId value to null to not return anything in case Activeuser do not follow any users/pages
    if (followedUserId === null) { return false } //return false if the activeuser do not follow anyone

    const db = getFirestore(firebaseApp)
    let postData = []
    console.log(followedUserId)
    const q = query(collection(db, "photos"), where("userId", "==", followedUserId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        postData.push(doc.data()) 
    });

    return postData;
}
 
export async function profilePosts(userId){
    //queries the database and returns posts for followed users only
    const db = getFirestore(firebaseApp)
    let postData = []

    const q = query(collection(db, "photos"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        postData.push(doc.data()) 
    });

    return postData;
}