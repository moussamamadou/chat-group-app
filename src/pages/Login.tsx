import React from 'react';
import { useUser } from '../contexts/UserContext';
import logoIcon from '../assets/logo.svg'
import googleIcon from '../assets/google.svg'
import githubIcon from '../assets/github.svg'

const Login:React.FC = () => {
    const { loginGoogle, loginGithub } = useUser()

    return (
        <div className=' p-4 bg-gray-700 flex flex-col justify-center items-center h-5/6'>
            <div className="flex justify-center items-center gap-2 mb-4">                
                <img className="w-10 h-10" src={logoIcon} alt="Google" />
                <h1 className='text-3xl font-bold text-gray-200'>Chat Group</h1>
            </div>
            <h3 className='text-xl font-bold mb-6 text-gray-200'>Let's join the chat and have some fun ...</h3>
            <button
                type='button'
                className="flex items-center gap-3 p-4 rounded shadow-xl mb-4 bg-white text-gray font-medium text-lg"
                onClick={loginGoogle}
            >
                <img className="w-6 h-6" src={googleIcon} alt="Google" />
                Sign In with Google
            </button>
            <button
                type='button'   
                className='flex items-center gap-3 p-4 rounded shadow-xl mb-4 bg-black text-white font-medium text-lg'
                onClick={loginGithub}
            >
                <img className="w-6 h-6" src={githubIcon} alt="Github" />
                Sign In with Github
            </button>
        </div>
    );
}

export default Login;
