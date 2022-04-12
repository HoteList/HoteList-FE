import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ImageContainer, Navbar } from '../components';
import { app } from '../firebase/firebase-config';
import { Axios } from '../helper/axios';
import imageCompression from 'browser-image-compression';
import { async } from '@firebase/util';

function EditRoomHotel() {
    const admin = useSelector((state) => state.admin.admins);
    const slug = useParams();
    const [roomDetail, setRoomDetail] = useState();
    const [files, setFiles] = useState([]);
    const urls = [];
    const compressionOption = {
		maxWidthOrHeight: 1080,
		useWebWorker: true,
	};

    const getRoomDetail = () => {
        Axios.get(`roomDetails/${slug.idRoom}`).then((resp) => {
            console.log(resp);
            const images = resp.data.image.split(',');
            setRoomDetail({
                name: resp.data.name,
                price: resp.data.price,
                description: resp.data.description,
                image: images,
                hotel_id: resp.data.hotel_id
            })
            setFiles(files.concat(images.map((item) => (
                {
                    name: "",
                    preview: item
                }
            ))))
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
        setRoomDetail({
            ...roomDetail,
            [name]: value
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
        if (roomDetail.name && roomDetail.price && roomDetail.description) {
            const sleep = m => new Promise(r => setTimeout(r, m));
            handleUpload();
            await sleep(3000);
            const imageString = urls.toString();
            await Axios.put(`/roomDetails`, {
                id: slug.idRoom,
                name: roomDetail.name,
                price: roomDetail.price,
                description: roomDetail.description,
                image: imageString,
                hotel_id: slug.id
            }).then((resp) => {
                console.log(resp);
            }).catch((err) => {
                console.log(err);
            })
        } else {
            alert('Field is required');
            e.preventDefault();
        }
    }

    useEffect(() => {
        getRoomDetail();
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
                                    value={roomDetail?.name}
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
                                    value={roomDetail?.description}
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
                        <div className="bg-base-200 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-semibold">Capacity</dt>
                            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                                <input
                                    type="text"
                                    name="capacity"
                                    id="capacity"
                                    className="mt-1 input input-sm input-bordered w-full max-w-lg"
                                    value={roomDetail?.price}
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

export default EditRoomHotel