import React from 'react'

function ImageContainer({ files, deleteFiles }) {
    return (
        <>
            {files?.map((file, key) => (
                <div className="relative" key={key}>
                    <div className='absolute inset-0 bg-primary-focus text-center text-primary-content font-semibold flex items-center justify-center opacity-0 hover:opacity-100 bg-opacity-90 duration-300 rounded-lg'>
                        <button type='button' className='text-error-content absolute top-2 right-2 hover:rounded-full hover:bg-base-content p-2 duration-200' onClick={()=>deleteFiles(file)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                                <path fillRule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                            </svg>
                        </button>
                    </div>
                    <img src={file.preview} alt={file.name} className="rounded-lg" />
                </div>
            ))}
        </>
    )
}

export default ImageContainer