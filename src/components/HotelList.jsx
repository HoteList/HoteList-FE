import React from 'react'

function HotelList({ hotel }) {
    return (
        <div className='overflow-x-auto w-full'>
            <table className='table w-full'>
                <thead>
                    <tr>
                        <th>Hotel Name</th>
                        <th>Description</th>
                        <th>Capacity</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {hotel.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <div className='flex items-center space-x-3'>
                                    <div>
                                        <div className='font-bold'>{item.name}</div>
                                        <div className='text-sm opacity-50'>Bandung</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {item.description}
                            </td>
                            <td>{item.capacity}</td>
                            <th>
                                <button className='btn btn-ghost btn-xs'>Details</button>
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default HotelList