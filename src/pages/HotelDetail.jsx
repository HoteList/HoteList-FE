import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Navbar, RoomList } from '../components';
import { Axios } from '../helper/axios';
import Geocode from "react-geocode";

function HotelDetail() {
    const admin = useSelector((state) => state.admin.admins);
    const slug = useParams();
    const [city, setCity] = useState();
    const [hotelDetail, setHotelDetail] = useState();
    const [roomDetail, setRoomDetail] = useState();
    
    const getHotelDetail = () => {
        Axios.get(`/hotel/${slug.id}`).then((resp) => {
            const images = resp.data.image.split(',');
            setHotelDetail({
                name: resp.data.name,
                description: resp.data.description,
                image: images,
                lat: resp.data.lat,
                lot: resp.data.lot,
                capacity: resp.data.capacity,
                id: resp.data.id
            });
        })
    }

    const getRoomDetail = () => {
        Axios.get(`/roomDetails/hotel/${slug.id}`).then((resp) => {
            const rooms = [];
            resp.data.forEach((data) => {
                const images = data.image.split(',');
                rooms.push({
                    id: data.id,
                    name: data.name,
                    price: data.price,
                    description: data.description,
                    image: images,
                    hotel_id: data.hotel_id
                })
            })
            setRoomDetail(rooms);
        })
    }

    const deleteRoomDetail = (id) => {
        Axios.delete(`roomDetails`, {
            data: {
                id: id
            }
        }).then(() => {
            alert("Hotel has been deleted")
        }).then(() => {
            window.location.reload();
        }).catch((err) => {
            console.log(err);
        })
        console.log(id);
    }
    
    useEffect(() => {
        getHotelDetail();
        getRoomDetail();
    }, [])

    Geocode.setApiKey(process.env.REACT_APP_MAPS_API);
    Geocode.fromLatLng(hotelDetail?.lat, hotelDetail?.lot).then((resp) => {
        for (let i = 0; i < resp.results[0].address_components.length; i++) {
            for (let j = 0; j < resp.results[0].address_components[i].types.length; j++) {
                switch (resp.results[0].address_components[i].types[j]) {
                    case "administrative_area_level_2":
                        setCity(resp.results[0].address_components[i].long_name);
                    break;
                }
            }
        }
    },
    (error) => {
        console.error(error);
    })

    return (
        <div className='min-h-screen pb-4'>
            <Navbar image={admin.image} username={admin.username} />
            <div className='bg-base-100 mx-10 mt-4 shadow overflow-hidden sm:rounded-lg'>
                <div className='p-4 sm:px-6 flex justify-between'>
                    <h3 className='text-lg font-semibold'>{hotelDetail?.name}</h3>
                    <Link to={`/listhotel/${hotelDetail?.id}/edit`}>
                        <button className='btn btn-outline btn-sm'>Edit</button>
                    </Link>
                </div>
                <div className='border-t border-base-300'>
                    <dl>
                        <div className="bg-base-200 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-semibold">Description</dt>
                            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">{hotelDetail?.description}</dd>
                        </div>
                        <div className="bg-base-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-semibold">Image</dt>
                            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                                <div className='gap-4 grid grid-cols-2 md:grid-cols-3 py-6'>
                                    {hotelDetail?.image.map((file, key) => (
                                        <div className='relative' key={key}>
                                            <img src={file} alt="Hotel Image" className='rounded-lg' />
                                        </div>
                                    ))}
                                </div>
                            </dd>
                        </div>
                        <div className="bg-base-200 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-semibold">Location</dt>
                            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">{`${city} (${hotelDetail?.lat}, ${hotelDetail?.lot})`}</dd>
                        </div>
                        <div className="bg-base-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-semibold">Capacity</dt>
                            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">{hotelDetail?.capacity}</dd>
                        </div>
                    </dl>
                </div>
            </div>
            <div className='mt-8 mx-10'>
                <div className='flex justify-between'>
                    <h3 className='text-lg font-semibold mb-2'>Room Details</h3>
                    <Link to={`/listhotel/${slug.id}/room/add`}>
                        <div className='btn'>Add Room</div>
                    </Link>
                </div>
                <RoomList data={roomDetail} deleteRoomDetail={deleteRoomDetail} />
            </div>
        </div>
    )
}

export default HotelDetail