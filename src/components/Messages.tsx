import React from 'react';
import { useChannels } from "../contexts/ChannelsContext";
import { useUser } from '../contexts/UserContext';

const Messages: React.FC  = () => {
    const {user} = useUser()
    const { messages} = useChannels()
    return (
        <div>
        { 
            messages && messages.map((message, key) => (   
                <div className="" key = {key}>
                    <p>---: {message.text}</p>
                    {/* <p>{message.uid}</p>
                    <p>{message.userName}</p>
                    <p>{message.userAvatar}</p> */}
                </div>
            ))
        }
            
        </div>
    );
}

export default Messages;
