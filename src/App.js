import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import * as PAGES from './constants/routes'
import useAuthListener from './hooks/useAuthListener'
import { UserContext } from './context/user'
import { Camera } from './styles/icons'

const Dashboard = lazy(() => import ('./pages/dashboard'));
const Login = lazy(() => import ('./pages/login'));
const SignUp = lazy(() => import ('./pages/signup'));
const Profile = lazy(() => import ('./pages/profile'));
const NotFound = lazy(() => import ('./pages/not-found'));

function App() {
    const { user } = useAuthListener();

    return (
        <UserContext.Provider value={{ user }}>
            <Router basename="/instgram">
                <Suspense fallback={<Camera />}>
                    <Routes>
                        <Route 
                            path={PAGES.LOGIN} 
                            element={!user ? <Login/> : <Navigate to={PAGES.DASHBOARD} />} //navigate to dashboard if the user is signed in
                        />
                        <Route 
                            path={PAGES.SIGN_UP} 
                            element={<SignUp/>} //removed auto navigate to dashboard if user signed in as it resulted in data fetching issues as the user is being redirected instantaneously before their profile is created in the database and resulted in no data is retrieved from database when it's called. this auto navigate on sign up is handled in sign up page
                        />
                        <Route path={PAGES.PROFILE} element={<Profile/>} />
                        <Route
                            path={PAGES.DASHBOARD} 
                            element={user ? <Dashboard/> : <Navigate to={PAGES.LOGIN} />} //Require Auth 
                        />
                        <Route path='*' element={<NotFound/>} />
                    </Routes>
                </Suspense>
            </Router>
        </UserContext.Provider>
    )
}

export default App
