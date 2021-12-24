import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";
import { firebaseApp } from '../lib/firebase'



export async function FollowedUsersPosts(followedUsersId = []){
    //queries the database and returns posts for followed users only
    //we initialize followedUserId value to null to not do a database query in case Activeuser do not follow any users/pages
    if (followedUsersId.length === 0) { return "no posts" } //return "no posts" if the activeuser do not follow anyone

    const db = getFirestore(firebaseApp)
    let postData = []

    const q = query(collection(db, "photos"), where("userId", "in", followedUsersId)); //fetching all posts of followed users
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        postData.push(doc.data()) 
    });

    return postData;
}
 
export async function profilePosts(userId){
    //queries the database and returns user profile posts
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