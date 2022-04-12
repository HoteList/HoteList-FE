import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';
import { ImageContainer, Navbar } from '../components'
import { app } from '../firebase/firebase-config';
import imageCompression from 'browser-image-compression';
import { Axios } from '../helper/axios';
import { useParams } from 'react-router-dom';

function AddRoomHotel() {
    const admin = useSelector((state) => state.admin.admins);
    const slug = useParams();
    const initialState = {
        name: "",
        price: "",
        description: "",
        image: "",
    }
    const [room, setRoom] = useState(initialState);
    const [files, setFiles] = useState([]);
    const compressionOption = {
		maxWidthOrHeight: 1080,
		useWebWorker: true,
	};
    const urls = [];

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
        setRoom({
            ...room,
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
            })
        }
    }

    const handleSubmit = async (e) => {
        if (room.name && room.description && room.price) {
            const sleep = m => new Promise(r => setTimeout(r, m));
            handleUpload();
            await sleep(3000);
            const imageString = urls.toString();
            Axios.post(`/roomDetails`, {
                name: room.name,
                price: room.price,
                description: room.description,
                image: imageString,
                hotel_id: slug.id
            }).then(() => {
                alert('Room has added');
            }).catch((err) => {
                console.log(err);
            })
        } else {
            alert("Field is required");
            e.preventDefault();
        }
    }

    return (
        <div className='min-h-screen'>
            <Navbar image={admin.image} username={admin.username} />
            <div className='mx-2 sm:mx-10 py-4'>
                <div className="md:grid md:grid-cols-3">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-semibold leading-6 text-base-100">Add Room Hotel</h3>
                        </div>
                    </div>
                    <div className='mt-5 md:mt-0 md:col-span-2 bg-base-100 shadow-md overflow-hidden rounded-lg'>
                        {/* <form> */}
                            <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="px-4 py-5 sm:p-6">
                                    <div className="grid grid-cols-12 gap-6">
                                        <div className="col-span-12 sm:col-span-6">
                                            <label htmlFor="name" className="block text-sm font-semibold">
                                                Nama Room Hotel
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                autoComplete="given-name"
                                                className="mt-1 input input-sm input-bordered w-full max-w-lg"
                                                onChange={handleInput}
                                            />
                                        </div>
                                        <div className="col-span-12 sm:col-span-6">
                                            <label htmlFor="price" className="block text-sm font-semibold">
                                                Harga
                                            </label>
                                            <input
                                                type="text"
                                                name="price"
                                                id="price"
                                                className="mt-1 input input-sm input-bordered w-full max-w-lg"
                                                onChange={handleInput}
                                            />
                                        </div>
                                        <div className="col-span-12">
                                            <label htmlFor="description" className="block text-sm font-semibold">
                                                Deskripsi
                                            </label>
                                            <textarea
                                                name="description"
                                                id="description"
                                                rows={3}
                                                className="mt-1 textarea textarea-bordered w-full"
                                                onChange={handleInput}
                                            />
                                        </div>
                                        <div {...getRootProps({ className: 'dropzone' })} className="col-span-12">
                                            <label htmlFor="image" className="block text-sm font-semibold">
                                                Foto Room Hotel
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
                                        <div className='col-span-12'>
                                            <h2 className='text-sm font-semibold'>Preview</h2>
                                            <div className='mt-1 gap-4 grid grid-cols-2 md:grid-cols-3 px-6 pt-5 pb-6 border-2 border-base-content border-dashed rounded-md'>
                                                <ImageContainer files={files} deleteFiles={deleteFiles} />
                                            </div>
                                        </div>
                                        <div className='col-span-12 flex justify-end'>
                                            <input type='submit' className='btn' value="Submit" onClick={handleSubmit}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        {/* </form> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddRoomHotel