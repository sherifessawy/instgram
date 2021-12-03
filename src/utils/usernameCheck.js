import { firebaseApp } from '../lib/firebase'
import { getFirestore, doc, getDoc} from 'firebase/firestore'

export default async function doesUsernameExist(username){
    const db = getFirestore(firebaseApp)
    const docRef = doc(db, "users", username);
    const docSnap = await getDoc(docRef).then(console.log('hi'))

    // if (docSnap.exists()) {
    //     console.log("Document data:", docSnap.data());
    // } else {
    //     // doc.data() will be undefined in this case
    //     console.log("username is valid");
    // }

    return docSnap.exists()
}