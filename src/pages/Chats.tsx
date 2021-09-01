import React from 'react'
import ChannelAdd from '../components/ChannelAdd'
import ChannelList from '../components/ChannelList'
import Messages from '../components/Messages'
import MessageSend from '../components/MessageSend'
import ChannelSearch from '../components/ChannelSearch'
import ChannelUsers from '../components/ChannelUsers'
import User from '../components/User'
import { ChannelsProvider } from '../contexts/ChannelsContext'
import { useUser } from '../contexts/UserContext';

const Chats:React.FC = () => {

    const { logOut } = useUser()
    return (
        <ChannelsProvider>
            <>
                <div>
                    <div
                        className=''
                        onClick={logOut}
                    >
                        Log out
                    </div>
                </div>
                <ChannelAdd />
                <ChannelSearch />
                <ChannelList />
                <ChannelUsers />
                <User />
                <Messages />
                <MessageSend />
            </>
        </ChannelsProvider>
    );
}

export default Chats;
