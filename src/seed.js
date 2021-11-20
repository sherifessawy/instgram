import { setDoc, doc } from "firebase/firestore"; 
import {getFirestore} from 'firebase/firestore'


// NOTE: replace 'bmjpkU8bBWRse2JwKgzOGTv5tUI3' with your Firebase auth user id (can be taken from Firebase at the auth section! Look for User UID)
export function seedDatabase(firebase) {
    const db = getFirestore(firebase)

    const users = [
      {
        userId: 'bmjpkU8bBWRse2JwKgzOGTv5tUI3',
        username: 'sherif',
        fullName: 'Sherif Khedr',
        emailAddress: 'karlhadwen@gmail.com',
        following: ['2'],
        followers: ['2', '3', '4'],
        dateCreated: Date.now()
      },
      {
        userId: '2',
        username: 'raphael',
        fullName: 'Raffaello Sanzio da Urbino',
        emailAddress: 'raphael@sanzio.com',
        following: [],
        followers: ['bmjpkU8bBWRse2JwKgzOGTv5tUI3'],
        dateCreated: Date.now()
      },
      {
        userId: '3',
        username: 'dali',
        fullName: 'Salvador Dalí',
        emailAddress: 'salvador@dali.com',
        following: [],
        followers: ['bmjpkU8bBWRse2JwKgzOGTv5tUI3'],
        dateCreated: Date.now()
      },
      {
        userId: '4',
        username: 'orwell',
        fullName: 'George Orwell',
        emailAddress: 'george@orwell.com',
        following: [],
        followers: ['bmjpkU8bBWRse2JwKgzOGTv5tUI3'],
        dateCreated: Date.now()
      }
    ];
    console.log('s')
    for (let k = 0; k < users.length; k++) {
      // Add a new document in collection "cities"
        console.log('d')
        const user = users[k]
        const userDoc = async () => {
            await setDoc(doc(db, "users", users[k].username), user)
        }
        userDoc()
    }
  
    for (let i = 1; i <= 5; ++i) {
        const userPhoto = async () => {
            await setDoc(doc(db, "photos", `user${i} photo`), 
                {
                photoId: i,
                userId: '2',
                imageSrc: `/images/users/raphael/${i}.jpg`,
                caption: 'Saint George and the Dragon',
                likes: [],
                comments: [
                    {
                    displayName: 'dali',
                    comment: 'Love this place, looks like my animal farm!'
                    },
                    {
                    displayName: 'orwell',
                    comment: 'Would you mind if I used this picture?'
                    }
                ],
                userLatitude: '40.7128°',
                userLongitude: '74.0060°',
                dateCreated: Date.now()
                }
            )
        }
        userPhoto()
    }
    
}
  