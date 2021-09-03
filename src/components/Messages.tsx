import React from 'react';
import { useChannels } from "../contexts/ChannelsContext";
import moment from 'moment'
import { Scrollbars } from 'rc-scrollbars';

const Messages: React.FC  = () => {
    const { messages, activeChannel} = useChannels()
    
    const dummy = React.useRef<HTMLElement | null>(null)
    
    React.useEffect(() => {
        dummy.current?.scrollIntoView({ behavior: "auto" });
    }, [messages, activeChannel]);


    return (
        <>
        
            <div 
                className="py-5 px-10 shadow-md font-bold text-xl flex pl-20 sm:pl-10 pl-"
            >               
                {`${activeChannel.name}`}
            </div>
            
            <div className='flex-1 px-10 overflow-hidden'>
                <Scrollbars style={{ width: '100%', height: '100%' }}>
                    { 
                        messages && messages.map((message, key, arr) => ( 
                            <div className="flex gap-4 mb-5" key = {key}>
                                <img className='w-8 h-8 rounded' src={message.user.photoURL} alt="" />
                                <div className="flex-1">
                                    <div className="font-medium mb-1  leading-5">
                                        <span className="text-gray-400">{message.user?.displayName}</span>
                                        &nbsp;&nbsp;•&nbsp;&nbsp;
                                        <span className="text-gray-400 font-normal text-xs">{moment(message?.createAt?.nanoseconds).format('llll')}</span>
                                    </div>
                                    <div className="">
                                        <p>{message.text}</p>
                                    </div>
                                    { arr.length -1 === key? <span id='dummy' className="w-0" ref={dummy}></span> : null} 
                                </div>
                            </div>
                        ))
                        
                    }
                    
                </Scrollbars>
                
                
            </div>
        </>
    )
}

export default Messages;
