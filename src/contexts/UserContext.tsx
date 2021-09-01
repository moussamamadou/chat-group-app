import React from 'react'
import firebase from 'firebase/compat/app'
import { auth } from '../services/firebase'
import {useHistory} from 'react-router-dom'

interface Props {
    children?: JSX.Element | null
}

interface UserContextInterface{
    authUser: any 
    loginGoogle: () => void
    loginGithub: () => void
    logOut: () => void
}

const UserContext = React.createContext({} as UserContextInterface)

export const UserProvider: React.FC<Props> = ({children}) => {

    const [authUser, setAuthUser] = React.useState<any>({})
    const [loading, setLoading] = React.useState(true)

    const history = useHistory()

    const loginGoogle = () => {
        auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    }

    const loginGithub = () => {
        auth.signInWithPopup(new firebase.auth.GithubAuthProvider())
    }
    const logOut = () => {
        auth.signOut()        
    }

    React.useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(user){
                setAuthUser(user)
                history.push('/')
            } else {
                history.push('/login')
                setAuthUser(null)
            }
            setLoading(false)
        })
    }, [authUser, history])

    const value:UserContextInterface = { 
        authUser,
        loginGoogle,
        loginGithub,
        logOut
    }

    return (
        <UserContext.Provider value={value}>
            {!loading && children}
        </UserContext.Provider>
    );
}

export const useUser = () => React.useContext(UserContext)
