import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Navbar } from '../components';
import UserList from '../components/UsersList';
import { Axios } from '../helper/axios';

function User() {
    const admin = useSelector((state) => state.admin.admins);
    const [user, setUser] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getUserData = async () => {
        await Axios.get(`/user`).then((resp) => {
            setUser(resp.data)
            setIsLoading(false);
        })
    }

    useEffect(() => {
        getUserData();
    }, [])

    return (
        isLoading ? (
            <div className='min-h-screen'>
                loading...
            </div>
        ) : (
            <div className="min-h-screen">
                <Navbar image={admin.image} username={admin.username} />
                <div className='container mx-auto px-10 py-4 font-semibold'>
                    <h3 className='text-lg mb-4'>Users</h3>
                    <UserList user={user} />
                </div>
            </div>
        )
    )
}

export default User