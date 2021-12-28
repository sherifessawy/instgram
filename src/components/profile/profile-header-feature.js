import React, {useState} from 'react'
import reactDom from 'react-dom'
import {Overlay, CloseContacts, ContactsLayer} from './profileStyles'
import Sidebar from '../sidebar'
import { getContactsDataById } from '../../utils/getUserData'

export function ShowContacts({targetContacts, profileData, followersCount}) {
    const [isActive, setIsActive] = useState(false)
    const [contacts, setContacts] = useState([])

    async function handleClick(){
        if (profileData[targetContacts].length === 0) {return null} //no followers or following
        const getContacts = await getContactsDataById(profileData[targetContacts])
        setContacts(getContacts)
        setIsActive(true)
    }

    const targetContactsText = targetContacts === "followers" ? (
            <><strong>{followersCount}</strong> followers</> 
        ):(
            <><strong>{profileData.following.length}</strong> following</> 
        ) 

    return (
        <>
            <p 
                onClick={() => handleClick()}
                className='contacts'
            >
                {targetContactsText}
            </p> 
            {isActive && (
                reactDom.createPortal(
                    <>
                        <Overlay onClick={() =>  setIsActive(false)}/>
                        <ContactsLayer >
                            <p className='contacts-text'>{targetContacts}</p>
                            {contacts.map( contact => (
                                <Sidebar.Profile
                                    onClick={() =>  setIsActive(false)}
                                    key={contact.userId} 
                                    src={`https://sherifessawy.github.io/instgram/images/avatars/${contact.username}.jpg`} 
                                    alt={`${contact.fullName} photo`}
                                    user={contact}
                                />
                            ))}
                             <CloseContacts onClick={() =>setIsActive(false)}>close</CloseContacts>
                        </ContactsLayer>
                    </>
                ,document.body)
            )}
        </>

    )
}
