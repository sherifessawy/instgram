import React, {useEffect} from 'react'
import Header from '../components/header'
import Sidebar from '../components/sidebar'
import Timeline from '../components/timeline'

function Dashboard() {
    useEffect(() => {
        document.title = 'Instagram';
    }, [])

    return (
        <div className="bg-gray-100">
            <Header />
            <div className="flex justify-between container mx-auto w-11/12 max-w-screen-lg mt-8 pb-16">
                <Timeline />
                <Sidebar />
            </div>
        </div>
    )
}

export default Dashboard
