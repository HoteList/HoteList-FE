import React from 'react'
import { useDispatch } from 'react-redux'
import { useMatch, useNavigate } from 'react-router-dom';
import { deleteAdmin } from '../redux/sliceAdmin';

function SessionAlert() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const session = sessionStorage.getItem('token');
    const handleLogOut = () => {
        dispatch(deleteAdmin());
        navigate('/login');
    }
    let match = useMatch('/login');
    return (
        <>
            {match?.pathname !== '/login' && !session ?
                <div class="modal modal-open modal-bottom sm:modal-middle">
                    <div class="modal-box">
                        <h3 class="font-bold text-lg">Sesi anda telah berakhir!</h3>
                        <p class="py-4">Silakan melakukan Login kembali</p>
                        <div class="modal-action">
                            <button onClick={handleLogOut} class="btn">Logout</button>
                        </div>
                    </div>
                </div>
                :
                null
            }
        </>
    )
}

export default SessionAlert