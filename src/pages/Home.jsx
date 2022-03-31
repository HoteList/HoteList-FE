import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Chart, Navbar, UsersList } from '../components';
import HotelList from '../components/HotelList';
import { Axios } from '../helper/axios';

function Home() {
    const admin = useSelector((state) => state.admin.admins);
    const [user, setUser] = useState([]);
    const [hotel, setHotel] = useState([]);

    const getUserData = async () => {
        await Axios.get(`/user`).then((resp) => {
            setUser(resp.data)
        })
    }
    const getHotelData = async () => {
        await Axios.get(`/getAllHotels`).then((resp) => {
            setHotel(resp.data)
        })
    }

    useEffect(() => {
        getUserData();
        getHotelData();
    }, [])

    const [data, setData] = useState({
        labels: ["Ibis Hotel", "Oyo Hotel", "RedDoorz", "Hotel Horison", "Hotel Bandung", "Hotel Pemalang", "Hotel Tangerang", "Hotel Jakarta", "Ibis Hotel", "Oyo Hotel", "RedDoorz", "Hotel Horison", "Hotel Bandung", "Hotel Pemalang", "Hotel Tangerang", "Hotel Jakarta"],
        datasets:[
            {
                data: [50, 100, 70, 120, 30, 10, 90, 150, 50, 100, 70, 120, 30, 10, 90, 150],
                label: "Transaksi Hotel",
                backgroundColor: ["#DCA54C"],
                borderColor: ["white"],
                borderWidth: 2,
                hoverOffset: 4,
            }
        ]
    })

    return (
        <div className='min-h-screen'>
            <Navbar image={admin.image} username={admin.username} />
            <div className='container mx-auto px-10 mt-7 font-semibold'>
                <h3 className='text-lg'>Overview</h3>
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
                    <div className='col-span-1 lg:col-span-12'>
                        <div className='relative bg-primary-content shadow-2xl rounded-lg p-4'>
                            <Chart data={data} />
                        </div>
                    </div>
                    <div className='col-span-1 lg:col-span-6'>
                        <div className='bg-primary-content shadow-2xl rounded-lg p-4'>
                            <UsersList user={user} />
                        </div>
                    </div>
                    <div className='col-span-1 lg:col-span-6'>
                        <div className='bg-primary-content shadow-2xl rounded-lg p-4'>
                            <HotelList hotel={hotel} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home