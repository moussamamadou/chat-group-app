import React from 'react';
import { useChannels } from '../contexts/ChannelsContext';
import sendButtonIcon from '../assets/send-button.svg'

const MessageSend:React.FC = () => {

    const { setNewMessage, activeChannel } = useChannels()
    const [formValue, setFormValue] = React.useState('')

    const sendMessage:React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setNewMessage(formValue)
        setFormValue('')
    }
    return (
        <div className='py-5 px-10'>
            <form  
                onSubmit={sendMessage} 
                className='flex p-2 w-full bg-gray-600 rounded gap-2 '
            >
                <input 
                    className='flex-1 bg-transparent outline-none' 
                    type="text" 
                    value={formValue} 
                    onChange={e => setFormValue(e.target.value)}                
                    placeholder={`Write to : ${activeChannel.name}`}
                />
                <button className="flex justify-center items-center w-7 h-7 bg-blue-600 rounded" type="submit" disabled={!formValue}>
                    <img className="w-3 h-4" src={sendButtonIcon} alt="Send" />
                </button>
            </form>            
        </div>
    );
}

export default MessageSend;
