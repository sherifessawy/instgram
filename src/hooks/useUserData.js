import { useState, useEffect, useContext } from 'react';
import { getUserDataById } from '../utils/getUserData';
import {UserContext} from '../context/user';

export default function useUserData() {
    const [activeUser, setActiveUser] = useState({});
    const { user } = useContext(UserContext);
    
    useEffect(() => {
        async function getUserObjByUserId() {
            // in here we need to query for the user data in the firestore
            const response = await getUserDataById(user.uid)
            setActiveUser( response ) // pass the user response to the state of activeUser
        }
        if (user && user.uid) {
            getUserObjByUserId();
        }
    }, [user]);
    
    return { user: activeUser }; // return activeUser as user to the hook when called
}
