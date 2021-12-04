import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import * as PAGES from './constanst/routes'

const Dashboard = lazy(() => import ('./pages/dashboard'));
const Login = lazy(() => import ('./pages/login'));
const SignUp = lazy(() => import ('./pages/signup'));
const Profile = lazy(() => import ('./pages/profile'));
const NotFound = lazy(() => import ('./pages/not-found'));

function App() {
    return (
        <Router>
            <Suspense fallback={<p>Loading...</p>}>
                <Routes>
                    <Route path={PAGES.LOGIN} element={<Login/>} />
                    <Route path={PAGES.SIGN_UP} element={<SignUp/>} />
                    <Route path={PAGES.PROFILE} element={<Profile/>} />
                    <Route path={PAGES.NOT_FOUND} element={<NotFound/>} />
                    <Route path={PAGES.DASHBOARD} element={<Dashboard/>} exact/>
                </Routes>
            </Suspense>
        </Router>
    )
}

export default App
