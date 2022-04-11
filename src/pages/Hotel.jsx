import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Navbar } from '../components';
import HotelList from '../components/HotelList';
import { Axios } from '../helper/axios';

function Hotel() {
    const admin = useSelector((state) => state.admin.admins);
    const [hotel, setHotel] = useState([]);
    const getHotelData = async () => {
        await Axios.get(`/hotel`).then((resp) => {
            setHotel(resp.data)
        })
    }

    useEffect(() => {
        getHotelData();
    }, [])
    return (
        <div className='min-h-screen'>
            <Navbar image={admin.image} username={admin.username} />
            <div className='container mx-auto px-10 py-4 font-semibold'>
                <h3 className='text-lg mb-4'>Hotels</h3>
                <HotelList hotel={hotel} />
            </div>
        </div>
    )
}

export default Hotel