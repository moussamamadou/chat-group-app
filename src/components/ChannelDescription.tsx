import { useChannels } from "../contexts/ChannelsContext";
import { Scrollbars } from 'rc-scrollbars';

const ChannelDescription = () => {
    const { activeChannel } = useChannels()
    return (
        <div className="flex flex-col py-5 px-5 gap-4 h-full">
            <div className="font-bold text-xl ">{activeChannel.name}</div>
            <p className="mb-2">{activeChannel.description}</p>
            <div className="font-bold text-xl">MEMBERS</div>
            
            <div  className="flex flex-col flex-1 h-full ">
            <Scrollbars style={{ width: '100%', height: '100%' }}>
            { 
                activeChannel.users && activeChannel.users.map((user, key) => ( 
                    <div className="flex gap-3 items-center mb-4" key = {key}>
                        <img className='w-8 h-8 rounded' src={user.photoURL} alt={user.displayName} />
                        <p className='truncate'>{user.displayName}</p>
                    </div>
                ))
            }
            
            </Scrollbars>
        </div>
        </div>
    );
}

export default ChannelDescription;
