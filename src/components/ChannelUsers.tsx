import React from 'react';
import { useChannels } from "../contexts/ChannelsContext";

const ChannelUsers = () => {
    const { activeChannel } = useChannels()
    return (
        <div>
            <div className="">Active Channel : {activeChannel.name}</div>
            <div className="">{activeChannel.description}</div>
            <div className="">All Members</div>
            { 
                activeChannel.users && activeChannel.users.map((user, key) => (   
                    <div className="" key = {key}>
                        <p>- {user.displayName}</p>
                    </div>
                ))
            }
        </div>
    );
}

export default ChannelUsers;
