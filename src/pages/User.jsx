import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Navbar } from '../components';
import UserList from '../components/UsersList';
import { Axios } from '../helper/axios';

function User() {
    const admin = useSelector((state) => state.admin.admins);
    const [user, setUser] = useState([]);

    const getUserData = async () => {
        await Axios.get(`/user`).then((resp) => {
            setUser(resp.data)
        })
    }

    useEffect(() => {
        getUserData();
    }, [])

    return (
        <div className="min-h-screen">
            <Navbar image={admin.image} username={admin.username} />
            <div className='container mx-auto px-10 mt-7 font-semibold'>
                <h3 className='text-lg mb-4'>Overview</h3>
                <UserList user={user} />
            </div>
        </div>
    )
}

export default User