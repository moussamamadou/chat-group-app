import React from 'react';
import { useUser } from '../contexts/UserContext';
import logoutIcon from '../assets/logout.svg'

const User = () => {
    const { logOut, authUser } = useUser()

    return (
        <div className='flex w-full  py-5 px-5 gap-3 items-center bg-gray-900'>
            <img className='w-8 h-8 rounded' src={authUser.photoURL} alt='User Avatar'/>
            <p className="flex-1 truncate">{authUser.displayName}</p>
            <button
                type='button'
                className='flex justify-center items-center w-7 h-7 bg-red-500 rounded'
                onClick={logOut}
            >
                <img className="w-4 h-4" src={logoutIcon} alt="Logout" />
            </button>
        </div>
    );
}

export default User;
