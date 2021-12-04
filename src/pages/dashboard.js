import React from 'react'
import Header from '../components/header'
import Sidebar from '../components/sidebar'
import Timeline from '../components/timeline'

function Dashboard() {
    return (
        <div className="bg-gray-100">
            <Header />
            <div className="grid grid-cols-3 gap-4 justify-items-center">
                <Timeline className="col-start-1 col-end-3"/>
                <Sidebar />
            </div>
        </div>
    )
}

export default Dashboard
