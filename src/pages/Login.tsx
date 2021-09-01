import React from 'react';
import { useUser } from '../contexts/UserContext';

const Login:React.FC = () => {
    const { loginGoogle, loginGithub } = useUser()

    return (
        <div>
            <div
                className=''
                onClick={loginGoogle}
            >
                Sign In with Google
            </div>
            <div
                className=''
                onClick={loginGithub}
            >
                Sign In with Github
            </div>
        </div>
    );
}

export default Login;
