import React from 'react'
import firebase from 'firebase/compat/app'
import { auth } from '../services/firebase'
import {useHistory} from 'react-router-dom'

interface Props {
    children?: JSX.Element | null
}

interface UserContextInterface{
    user: any 
    loginGoogle: () => void
    logOut: () => void
}

const UserContext = React.createContext({} as UserContextInterface)

export const UserProvider: React.FC<Props> = ({children}) => {

    const [user, setUser] = React.useState<any>({})
    const [loading, setLoading] = React.useState(true)

    const history = useHistory()

    const loginGoogle = () => {
        auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    }
    const logOut = () => {
        auth.signOut()        
    }

    React.useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(user){
                setUser(user)
                history.push('/')
            } else {
                history.push('/login')
                setUser({})
            }
            setLoading(false)
        })
    }, [user, history])

    const value:UserContextInterface = { 
        user,
        loginGoogle,
        logOut
    }

    return (
        <UserContext.Provider value={value}>
            {!loading && children}
        </UserContext.Provider>
    );
}

export const useUser = () => React.useContext(UserContext)
