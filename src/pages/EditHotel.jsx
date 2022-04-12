import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ImageContainer, Navbar } from '../components'
import { Axios } from '../helper/axios';
import Geocode from "react-geocode";
import { app } from '../firebase/firebase-config';
import imageCompression from 'browser-image-compression';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

function EditHotel() {
    const admin = useSelector((state) => state.admin.admins);
    const slug = useParams();
    const [hotelDetail, setHotelDetail] = useState();
    const [files, setFiles] = useState([]);
    const [address, setAddress] = useState();
    const urls = [];
    const compressionOption = {
		maxWidthOrHeight: 1080,
		useWebWorker: true,
	};

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
            setFiles(files.concat(images.map((item) => (
                {
                    name: "",
                    preview: item
                }
            ))))
            Geocode.fromLatLng(resp.data.lat, resp.data.lot).then((resp) => {
                setAddress(resp.results[0].formatted_address);
            })
        })
    }

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/jpg,image/png,image/jpeg',
        onDrop: acceptedFiles => {
            setFiles(files.concat(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            }))));
        },
        noDragEventsBubbling: true
    });

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setHotelDetail({
            ...hotelDetail,
            [name]: value
        })
    }

    Geocode.setApiKey(process.env.REACT_APP_MAPS_API);
    const geocode = (e) => {
        setAddress(e.target.value);
        Geocode.fromAddress(address).then((resp) => {
            const lat = (resp.results[0].geometry.location.lat).toString();
            const lot = (resp.results[0].geometry.location.lng).toString();
            setHotelDetail({
                ...hotelDetail,
                lat: lat,
                lot: lot
            })
        })
    }

    const deleteFiles = (image) => {
        const newFile = [...files];
        newFile.splice(newFile.indexOf(image), 1);
        setFiles(newFile);
    }

    const handleUpload = () => {
        if (app) {
            files.forEach((item) => {
                if (item.name !== '') {
                    const file = item;
                    const storageRef = getStorage();
                    const fileRef = ref(storageRef, file.name);
                    imageCompression(file, compressionOption)
                    .then((compressedFile) => {
                        uploadBytes(fileRef, compressedFile)
                        .then(() => {
                            getDownloadURL(fileRef)
                            .then((url) => {
                                urls.push(url)
                            })
                        })
                    })
                } else {
                    urls.push(item.preview);
                }
            })
        }
    }

    const handleSubmit = async (e) => {
        if (hotelDetail.name && hotelDetail.capacity && hotelDetail.lat && hotelDetail.lot && hotelDetail.description) {
            const sleep = m => new Promise(r => setTimeout(r, m));
            handleUpload();
            await sleep(3000);
            const imageString = urls.toString();
            await Axios.put(`/hotel`, {
                name: hotelDetail.name,
                capacity: parseInt(hotelDetail.capacity),
                description: hotelDetail.description,
                lat: hotelDetail.lat,
                lot: hotelDetail.lot,
                image: imageString,
                id: hotelDetail.id
            }).then(() => {
                alert("Hotel has Updated")
            })
            .catch((err) => {
                console.log(err);
            })
        } else {
            alert('Field is required');
            e.preventDefault();
        }
    }

    useEffect(() => {
        getHotelDetail();
    }, [])

    return (
        <div className='min-h-screen pb-4'>
            <Navbar image={admin.image} username={admin.username} />
            <div className='bg-base-100 mx-10 mt-4 shadow overflow-hidden sm:rounded-lg'>
                <div className='p-4 sm:px-6 flex justify-between'>
                    <h3 className='text-lg font-semibold'>Edit Hotel</h3>
                    <button className='btn btn-outline btn-sm' onClick={handleSubmit}>Save</button>
                </div>
                <div className='border-t border-base-300'>
                    <dl>
                        <div className="bg-base-200 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-semibold">Name</dt>
                            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    autoComplete="given-name"
                                    className="mt-1 input input-sm input-bordered w-full"
                                    value={hotelDetail?.name}
                                    onChange={handleInput}
                                />
                            </dd>
                        </div>
                        <div className="bg-base-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-semibold">Description</dt>
                            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                                <textarea
                                    type="text"
                                    name="description"
                                    id="description"
                                    rows={5}
                                    className="mt-1 textarea textarea-bordered w-full"
                                    value={hotelDetail?.description}
                                    onChange={handleInput}
                                />  
                            </dd>
                        </div>
                        <div className="bg-base-200 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-semibold">Image</dt>
                            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                                <div className='mt-1 gap-4 grid grid-cols-2 md:grid-cols-3 px-6 pt-5 pb-6 border-2 border-base-content border-dashed rounded-md'>
                                    <ImageContainer files={files} deleteFiles={deleteFiles} />
                                </div>
                                <div {...getRootProps({ className: 'dropzone' })}>
                                    <label htmlFor="image" className="block text-sm font-semibold">
                                        Foto Hotel
                                    </label>
                                    <div className='flex mt-1 justify-center px-6 pt-5 pb-6 border-2 border-base-content border-dashed rounded-md'>
                                        <input {...getInputProps()} className="sr-only" multiple />
                                        <div className="space-y-1 text-center">
                                            <svg
                                                className="mx-auto h-12 w-12"
                                                stroke="currentColor"
                                                fill="none"
                                                viewBox="0 0 48 48"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                            <div className="flex text-sm">
                                                <p className="pl-1">Upload a file or drag and drop</p>
                                            </div>
                                            <p className="text-xs">PNG, JPG, and JPEG</p>
                                        </div>
                                    </div>
                                </div>
                            </dd>
                        </div>
                        <div className="bg-base-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-semibold">Location</dt>
                            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                                <input
                                    type="text"
                                    name="lokasi"
                                    id="lokasi"
                                    autoComplete="street-address"
                                    className="mt-1 input input-sm input-bordered w-full"
                                    value={address}
                                    onChange={geocode}
                                />
                            </dd>
                        </div>
                        <div className="bg-base-200 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-semibold">Capacity</dt>
                            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                                <input
                                    type="text"
                                    name="capacity"
                                    id="capacity"
                                    className="mt-1 input input-sm input-bordered w-full max-w-lg"
                                    value={hotelDetail?.capacity}
                                    onChange={handleInput}
                                />
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    )
}

export default EditHotel