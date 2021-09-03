
import React from "react"
import { useChannels } from "../contexts/ChannelsContext";
import { Scrollbars } from 'rc-scrollbars';
interface Props {
    setShowChannels: (active: boolean) => void
    setIsSideOpen: (active: boolean) => void
}

const ChannelList: React.FC<Props> = ({ setShowChannels, setIsSideOpen}) => {
    const { filteredChannels, setSeletedChannel } = useChannels()

    return (
        <div className="flex flex-col flex-1 h-full mx-5">
            <Scrollbars style={{ width: '100%', height: '100%' }}>
                {
                    filteredChannels && filteredChannels.map((channel, key) => (
                        <div
                            className="flex gap-4 items-center mb-4 cursor-pointer"
                            onClick={() => {
                                setSeletedChannel(channel.id);
                                setShowChannels(false);
                                setIsSideOpen(false)
                            }}
                            key={channel.id}>
                            <img className='w-8 h-8 rounded' src={`https://avatars.dicebear.com/api/initials/:${channel.name}.svg`} alt="" />
                            <p className='flex-1 truncate'>
                                {channel.name}
                            </p>
                        </div>
                    ))
                }

            </Scrollbars>
        </div>
    );
}

export default ChannelList;
