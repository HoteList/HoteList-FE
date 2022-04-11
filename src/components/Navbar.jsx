import React from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../image/logo.png'
import { deleteAdmin } from '../redux/sliceAdmin';

function Navbar({ image, username }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogOut = () => {
        dispatch(deleteAdmin());
        navigate('/login')
    }
    return (
        <div className="sticky top-0 z-10 navbar shadow-sm shadow-brown-primary px-6 bg-white">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex="0" className="btn bg-transparent border-none hover:bg-transparent lg:hidden swap swap-rotate">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex="0" className="menu menu-compact dropdown-content text-base-300 mt-3 p-2 shadow bg-base-content rounded-box w-52">
                        <li>
                            <Link to={`/`}>
                                <a className='hover:bg-primary-focus hover:bg-opacity-40'>Dashboard</a>
                            </Link>
                        </li>
                        <li tabIndex="0">
                            <a className="justify-between hover:bg-primary-focus hover:bg-opacity-40">
                                Hotel
                                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/></svg>
                            </a>
                            <ul className="p-2 bg-neutral-content">
                                <Link to={`/addhotel`}>
                                    <li>
                                        <a className='hover:bg-primary-focus hover:bg-opacity-40'>Add Hotel</a>
                                    </li>
                                </Link>
                                <Link to={`/listhotel`}>
                                    <li>
                                        <a className='hover:bg-primary-focus hover:bg-opacity-40'>List Hotel</a>
                                    </li>
                                </Link>
                            </ul>
                        </li>
                        <li>
                            <Link to={`/listuser`}>
                                <a className='hover:bg-primary-focus hover:bg-opacity-40'>User</a>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <Link to={`/`}>
                        <img src={logo} alt="Logo" className='w-36' />
                    </Link>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0 text-base-300 font-semibold">
                    <li>
                        <Link to={`/`}>
                            <a>Dashboard</a>
                        </Link>
                    </li>
                    <li tabIndex="0">
                        <a>
                            Hotel
                            <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
                        </a>
                        <ul className="p-2 bg-base-content">
                            <Link to={`/addhotel`}>
                                <li >
                                    <a className='hover:bg-primary-focus hover:bg-opacity-40 font-medium'>Add Hotel</a>
                                </li>
                            </Link>
                            <Link to={`/listhotel`}>
                                <li>
                                    <a className='hover:bg-primary-focus hover:bg-opacity-40 font-medium'>List Hotel</a>
                                </li>
                            </Link>
                        </ul>
                    </li>
                    <li>
                        <Link to={`/listuser`}>
                            <a>User</a>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className='navbar-end'>
                <div className="dropdown dropdown-end">
                    <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
                        {image !== "" && image !== null ? 
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
                    </label>
                    <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-content text-base-300 rounded-box w-52">
                        <li>
                            <a className='hover:bg-primary-focus hover:bg-opacity-40'>Settings</a>
                        </li>
                        <li>
                            <a onClick={handleLogOut} className='hover:bg-primary-focus hover:bg-opacity-40'>Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar