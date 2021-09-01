import React from 'react'
import { useUser } from '../contexts/UserContext';

import {Props, ContextValue, Channel, Message, User} from '../helpers/interface'
import {getChannels, getChannel, getWelcomeChannel, addChannel, addUserToChannel, getMessages, sendMessage } from '../helpers/channels'

const ChannelContext = React.createContext({} as ContextValue)
export const ChannelsProvider:  React.FC<Props> = ({children}) => {

    const { authUser } = useUser()
    const [user, setUser] = React.useState({} as User)
    const [newChannel, setNewChannel] = React.useState({id:'', name:'', description:'', users:[{}]} as Channel)
    const [activeChannel, setActiveChannel] = React.useState({} as Channel)
    const [channels, setChannels] = React.useState([{} as Channel])
    const [filteredChannels, setfilteredChannels] = React.useState([{} as Channel])
    const [messages, setMessages] = React.useState([{} as Message])
    const [newMessage, setNewMessage] = React.useState('')
    const [seletedChannel, setSeletedChannel] = React.useState('')
    const [searchedChannel, setSearchedChannel] = React.useState('')
    
    const [loading, setLoading] = React.useState(true)

    
    React.useEffect(() => {

        setUser({
            uid: authUser.uid,
            displayName: authUser.displayName,
            photoURL: authUser.photoURL 
        })

        getChannels(setChannels)

        if(localStorage.getItem('selectedChannel')){                    
            setSeletedChannel(localStorage.getItem('selectedChannel') as string)
        }else{
            getWelcomeChannel(setSeletedChannel)
        }

    }, [authUser])

    React.useEffect(() => {
        if(newChannel.name !== ''){
            addChannel(setSeletedChannel, setNewChannel,newChannel, user)
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
            getChannel(seletedChannel, setActiveChannel) 
            getMessages(seletedChannel, setMessages, setLoading)
        }
    }, [seletedChannel])

    React.useEffect(() => {
        if(newMessage !== ''){
            sendMessage(newMessage, seletedChannel, user)
            addUserToChannel(seletedChannel, user)            
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
