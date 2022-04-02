import React from 'react'

function UserList({ user }) {
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
                                        {item.lat.length !== 0 || item.lot.length !== 0 ? 
                                            <div className='text-sm opacity-50'>{`Lat: ${item.lat}, Long: ${item.lot}`}</div>
                                        : null
                                        }
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