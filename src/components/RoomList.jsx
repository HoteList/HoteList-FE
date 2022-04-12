import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link, useParams } from 'react-router-dom';

function RoomList({ data, deleteRoomDetail }) {
    // console.log(data);
    const slug = useParams();
    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
            {data?.map((item, key) => (
                <div key={key} className="bg-base-100 sm:rounded-lg mt-2 md:flex">
                    <div className='md:max-w-xs'>
                        <Swiper
                            autoplay={{ 
                                delay: 2500,
                                disableOnInteraction: false,
                             }}
                            pagination={{ clickable: true }}
                            navigation={true}
                            modules={[Autoplay, Pagination, Navigation]}
                            className="mySwiper sm:rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
                        >
                            {item?.image.map((image) => (
                                <SwiperSlide>
                                    <img src={image} alt="Image" className='w-full h-52 md:w-80 object-cover'/>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div className='m-4 md:w-full'>
                        <div className='flex items-center gap-x-4'>
                            <h1 className='text-lg font-semibold'>{item?.name}</h1>
                            <div className='badge lg:badge-xs badge-lg'>{`Rp.${item?.price}`}</div>
                        </div>
                        <p className='mt-2'>{item?.description}</p>
                        <div className='flex gap-x-4 justify-end mt-20'>
                            <div className='btn btn-outline btn-sm' onClick={()=>deleteRoomDetail(item?.id)}>Delete</div>
                            <Link to={`/listhotel/${slug.id}/room/${item?.id}/edit`}>
                                <div className='btn btn-outline btn-sm'>Edit</div>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default RoomList