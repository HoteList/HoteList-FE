import React from 'react'
import { useSelector } from 'react-redux'
import { Navbar } from '../components';

function Home() {
    const admin = useSelector((state) => state.admin.admins);
    return (
        <div className='min-h-screen'>
            <Navbar image={admin.image} username={admin.username} />
            <div>
                Halo
            </div>
        </div>
    )
}

export default Home