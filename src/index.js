import React from 'react'
import reactDom from 'react-dom'
import App from './App'
import './index.css'
import {firebaseApp} from './lib/firebase'
import {FirebaseContext} from './context/firebase'

reactDom.render(
    <FirebaseContext.Provider value={{firebaseApp}}>
        <App />
    </FirebaseContext.Provider>
    , document.getElementById('root'))