import React from 'react';
import { useUser } from '../contexts/UserContext';

const Login:React.FC = () => {
    const { loginGoogle } = useUser()

    return (
        <div>
            <div
                className=''
                onClick={loginGoogle}
            >
                Sign In with Google
            </div>
        </div>
    );
}

export default Login;
