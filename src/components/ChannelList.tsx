
import React from "react"
import { useChannels } from "../contexts/ChannelsContext";

const ChannelList: React.FC = () => {
    const { filteredChannels, setSeletedChannel } = useChannels()
    
    return (
        <div>
            <div className="">All Channels</div>
            { 
                filteredChannels && filteredChannels.map((channel, key) => (   
                    <div className="" key = {channel.id}>
                        <p onClick={() => setSeletedChannel(channel.id)}>- {channel.name}</p>
                    </div>
                ))
            }
        </div>
    );
}

export default ChannelList;
