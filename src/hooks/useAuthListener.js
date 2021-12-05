import {useState, useContext, useEffect} from 'react'
import { FirebaseContext } from '../context/firebase'
import {onAuthStateChanged, getAuth} from 'firebase/auth'

function useAuthListener() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser'))) //saving auth status to local sorage to keep user signed in on page refresh
    const {firebase} = useContext(FirebaseContext)

    useEffect(() => {
        const authLisitner = onAuthStateChanged(getAuth(firebase), (authUser) => {
            if (authUser){
                localStorage.setItem('authUser', JSON.stringify(authUser))
                setUser(authUser)
            } else {
                localStorage.removeItem('authUser')
                setUser(null)
            }
        })
        return () => authLisitner()

    }, [])

    return {user}
}

export default useAuthListener
