import React from 'react';
import { useChannels } from '../contexts/ChannelsContext';

const MessageSend:React.FC = () => {

    const dummy = React.useRef<HTMLElement | null>(null)
    const { setNewMessage } = useChannels()
    const [formValue, setFormValue] = React.useState('')

    const sendMessage:React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setNewMessage(formValue)
        setFormValue('')
    }
    React.useEffect(() => {
        // dummy.current?.scrollIntoView({ behavior: 'smooth' });
    });

    return (
        <div>
            <span ref={dummy}> Send Message </span>
            <form  onSubmit={sendMessage}>
                <input type="text" value={formValue} onChange={e => setFormValue(e.target.value)}/>
                <button type="submit" disabled={!formValue}>🕊️</button>
            </form>            
        </div>
    );
}

export default MessageSend;
