import React from 'react'
import { useEffect, useState } from 'react'
import Geocode from "react-geocode";

function UserList({ user }) {

    const [users, setUsers] = useState(user);

    useEffect(() => {
        for (let k = 0; k < user.length; k++) {
            // console.log(user);
            Geocode.setApiKey(process.env.REACT_APP_MAPS_API);
            Geocode.fromLatLng(user[k]?.lat, user[k]?.lot).then((resp) => {
                // console.log(i)
                for (let i = 0; i < resp.results[0].address_components.length; i++) {
                    for (let j = 0; j < resp.results[0].address_components[i].types.length; j++) {
                        switch (resp.results[0].address_components[i].types[j]) {
                            case "administrative_area_level_2":
                                setUsers(users[k].location = (resp.results[0].address_components[i].long_name));
                                // console.log(hotels)
                            break;
                        }
                    }
                }
            },
            (error) => {
                setUsers(users[k].location = "nan");
                console.error(error);
            })
        }
        console.log(user);
    }, []);

    return (
        <div className='overflow-x-auto w-full'>
            <table className='table w-full'>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Full Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {console.log(user)} */}
                    {user.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <div className='flex items-center space-x-3'>
                                    {item.image ? (
                                        <div className='avatar'>
                                            <div className='mask mask-squircle w-12 h-12'>
                                                <img src={item.image} alt={`Profile Picture ${item.username}`} />
                                            </div>
                                        </div>
                                    ) : 
                                        <div className='avatar placeholder'>
                                            <div className='bg-primary-content mask mask-squircle w-12 h-12'>
                                                <span className='text-2xl uppercase'>{item.username[0]}</span>
                                            </div>
                                        </div>
                                    }
                                    <div>
                                        <div className='font-bold'>{item.username}</div>
                                        <div className='text-sm opacity-50'>{item.location}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {item.full_name}
                            </td>
                            <td>{item.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default UserList