import React from 'react'
import { useUser } from '../contexts/UserContext';
import {firestore, FieldValue} from '../services/firebase'

interface Props {
    children?: JSX.Element | null
}

interface User{
    uid:string
    userAvatar:string
    userName:string
}

interface Channel {
    id:string
    name:string
    description:string
    users:Array<User>
}

interface Message {
    text:string
    createAt:string
    user:User
}


interface ContextValue {
    filteredChannels: Channel[]
    messages: Message[]
    activeChannel: Channel
    setSeletedChannel: (text:string) => void
    setSearchedChannel: (text:string) => void
    setNewChannel: (channel: Channel) => void
    setNewMessage: (text:string) => void
}

const ChannelContext = React.createContext({} as ContextValue)

export const ChannelsProvider:  React.FC<Props> = ({children}) => {

    const [newChannel, setNewChannel] = React.useState({id:'', name:'', description:'', users:[{}]} as Channel)
    const [activeChannel, setActiveChannel] = React.useState({} as Channel)
    const [channels, setChannels] = React.useState([{} as Channel])
    const [filteredChannels, setfilteredChannels] = React.useState([{} as Channel])
    const [messages, setMessages] = React.useState([{} as Message])
    const [newMessage, setNewMessage] = React.useState('')
    const [seletedChannel, setSeletedChannel] = React.useState('')
    const [searchedChannel, setSearchedChannel] = React.useState('')
    
    const [loading, setLoading] = React.useState(true)

    const { user } = useUser()
    
    React.useEffect(() => {
        firestore
            .collection('channels')
            .orderBy('name')
            .onSnapshot(snapShot => {
                const tempChannels:Array<Channel> = []
                snapShot.forEach(change => 
                    tempChannels.push({
                        id: change.id,
                        name: change.data().name, 
                        description: change.data().description,
                        users: change.data().users
                    })
                )
                setChannels(tempChannels)
            })

        firestore
            .collection('channels')
            .where('name', '==', 'Welcome')
            .limit(1)
            .get()
            .then(snapShot => {
                if(localStorage.getItem('selectedChannel')){                    
                    setSeletedChannel(localStorage.getItem('selectedChannel') as string)
                }else{
                    setSeletedChannel(snapShot.docChanges()[0].doc?.id)
                }              

            })
    }, [])

    React.useEffect(() => {
        if(newChannel.name !== ''){
            firestore
                .collection('channels')
                .add({
                    name: newChannel.name,
                    description:  newChannel.description,
                    users: [{
                        uid: user.uid,
                        userName: user.displayName,
                        userAvatar: user.photoURL
                    }]
                })
                .then(imNew => {
                    setSeletedChannel(imNew.id)
                })
            setNewChannel({id:'', name:'', description:'', users:[{} as User]})
        }
    }, [newChannel, seletedChannel, user])
 
    React.useEffect(() => {
        setfilteredChannels(
            channels.filter(
                (channel) => channel.name?.toLowerCase().includes(searchedChannel.toLowerCase())
            )
        )        
    }, [channels, searchedChannel])

    React.useEffect(() => {
        if (seletedChannel !== ''){
            firestore
                .collection('channels')
                .doc(seletedChannel)
                .collection('messages')
                .orderBy('createAt', 'asc')
                .onSnapshot(snapShot => {
                    const tempMessages:Array<Message> = []
                    snapShot.forEach(change => 
                        tempMessages.push(change.data() as Message)
                    )
                    setMessages(tempMessages)
                    setLoading(false)
                })
            firestore
                .collection('channels')
                .doc(seletedChannel)
                .onSnapshot(snapShot => {
                    localStorage.setItem('selectedChannel', snapShot?.id)
                    setActiveChannel({
                        id: snapShot?.id,
                        name: snapShot?.data()?.name,
                        description: snapShot?.data()?.description,
                        users: snapShot?.data()?.users
                    })
                })
        }
    }, [seletedChannel])

    React.useEffect(() => {
        if(newMessage !== ''){
            firestore
                .collection('channels')
                .doc(seletedChannel)
                .collection('messages')
                .add({
                    text: newMessage,
                    createAt:  FieldValue().serverTimestamp(),
                    user: {
                        uid: user?.uid,
                        userName: user?.displayName,
                        userAvatar: user?.photoURL,
                    }
                })

            firestore
                .collection('channels')
                .doc(seletedChannel)
                .get()
                .then((doc) => {
                    const data = doc?.data()
                    if(!data?.users?.includes(user.uid)){
                        firestore
                            .collection('channels')
                            .doc(seletedChannel)
                            .update({
                                users: FieldValue().arrayUnion({
                                        uid:user.uid,
                                        userName:user.displayName, 
                                        userAvatar:user.photoURL
                                    }
                                )
                            })                                               
                    }
                })
            setNewMessage('')
        }
    }, [newMessage, seletedChannel, user])

    const value: ContextValue ={
        filteredChannels: filteredChannels,
        messages: messages,
        activeChannel: activeChannel,
        setSeletedChannel: setSeletedChannel,
        setSearchedChannel: setSearchedChannel,
        setNewChannel: setNewChannel,
        setNewMessage: setNewMessage,
    }

    return (
        <ChannelContext.Provider value={value}>
            {!loading && children}
        </ChannelContext.Provider>
    );
}

export const useChannels =  () =>  React.useContext(ChannelContext)
