import React from 'react'
import logo from '../image/logo.png'

function Navbar({ image, username }) {
    return (
        <div className="navbar shadow-sm shadow-brown-primary px-6">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabindex="0" className="btn bg-transparent border-none hover:bg-transparent lg:hidden swap swap-rotate">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabindex="0" className="menu menu-compact dropdown-content text-base-300 mt-3 p-2 shadow bg-base-content rounded-box w-52">
                        <li>
                            <a className='hover:bg-primary-focus hover:bg-opacity-40'>Dashboard</a>
                        </li>
                        <li tabindex="0">
                            <a className="justify-between hover:bg-primary-focus hover:bg-opacity-40">
                                Hotel
                                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/></svg>
                            </a>
                            <ul className="p-2 bg-neutral-content">
                                <li>
                                    <a className='hover:bg-primary-focus hover:bg-opacity-40'>Add Hotel</a>
                                </li>
                                <li>
                                    <a className='hover:bg-primary-focus hover:bg-opacity-40'>Edit Hotel</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a className='hover:bg-primary-focus hover:bg-opacity-40'>User</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <img src={logo} alt="Logo" className='w-36' />
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0 text-base-300 font-semibold">
                    <li>
                        <a>Dashboard</a>
                    </li>
                    <li tabindex="0">
                        <a>
                            Hotel
                            <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
                        </a>
                        <ul className="p-2 bg-base-content">
                            <li >
                                <a className='hover:bg-primary-focus hover:bg-opacity-40 font-medium'>Add Hotel</a>
                            </li>
                            <li>
                                <a className='hover:bg-primary-focus hover:bg-opacity-40 font-medium'>Edit Hotel</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a>User</a>
                    </li>
                </ul>
            </div>
            <div className='navbar-end'>
                <div className="dropdown dropdown-end">
                    <label tabindex="0" className="btn btn-ghost btn-circle avatar">
                        {image !== "" ? 
                            <div className="w-10 rounded-full">
                                <img src={image} alt="Avatar" />
                            </div>
                            :
                            <div className='avatar placeholder'>
                                <div className='bg-primary-content rounded-full w-10 text-neutral-content'>
                                    <span className='text-2xl'>{username[0]}</span>
                                </div>
                            </div>
                        }
                        {/* <img src="https://api.lorem.space/image/face?hash=33791" /> */}
                    </label>
                    <ul tabindex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-content text-base-300 rounded-box w-52">
                        <li>
                            <a className="justify-between hover:bg-primary-focus hover:bg-opacity-40">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li>
                            <a className='hover:bg-primary-focus hover:bg-opacity-40'>Settings</a>
                        </li>
                        <li>
                            <a className='hover:bg-primary-focus hover:bg-opacity-40'>Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar