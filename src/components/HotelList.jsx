import React from 'react'
import { Link } from 'react-router-dom'
import { Axios } from '../helper/axios'
import Geocode from "react-geocode";
import { useEffect } from 'react';
import { useState } from 'react';

function HotelList({ hotel }) {
    const deleteHotel = (ids) => {
        const id = ids.toString();
        Axios.delete(`hotel`, {
            data: {
                id: id
            }
        }).then(() => {
            alert("Hotel has been deleted")
        }).catch((err) => {
            console.log(err);
        })
        console.log(id);
    }

    const [hotels, setHotels] = useState(hotel);

    useEffect(() => {

        for (let k = 0; k < hotel.length; k++) {
            Geocode.setApiKey(process.env.REACT_APP_MAPS_API);
            Geocode.fromLatLng(hotel[k]?.lat, hotel[k]?.lot).then((resp) => {
                for (let i = 0; i < resp.results[0].address_components.length; i++) {
                    for (let j = 0; j < resp.results[0].address_components[i].types.length; j++) {
                        switch (resp.results[0].address_components[i].types[j]) {
                            case "administrative_area_level_2":
                                setHotels(hotels[k].location = (resp.results[0].address_components[i].long_name));
                            break;
                        }
                    }
                }
            },
            (error) => {
                console.error(error);
                // return 'null';
            })
        }
        console.log(hotel)
    }, [])

    return (
        <div className='overflow-x-auto w-full'>
            {/* {console.log(hotels)} */}
            <table className='table w-full'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Hotel Name</th>
                        <th>Description</th>
                        <th>Capacity</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {hotel.map((item, index) => (
                        <tr key={index}>
                            <th>{index+1}</th>
                            <td>
                                <div className='flex items-center space-x-3'>
                                    <div>
                                        <div className='font-bold'>{item.name}</div>
                                        <div className='text-sm opacity-50'>{item.location}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {item.description.length > 255 ?
                                    (`${item.description.substring(0,25)}...`)
                                :
                                    (item.description)
                                }
                            </td>
                            <td>{item.capacity}</td>
                            <th>
                                <Link to={`/listhotel/${item.id}`}>
                                    <button className='btn btn-ghost'>Details</button>
                                </Link>
                            </th>
                            <th>
                                <button className='btn btn-ghost' onClick={()=>deleteHotel(item.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                    </svg>
                                </button>
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default HotelList