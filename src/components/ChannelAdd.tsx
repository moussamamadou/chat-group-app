import React from 'react';
import { useChannels } from '../contexts/ChannelsContext';

const ChannelAdd = () => {
    const { setNewChannel } = useChannels()
    const [formName, setFormName] = React.useState('')
    const [formDesc, setFormDesc] = React.useState('')

    const addChannel:React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        setNewChannel({
            id: '', 
            name : formName, 
            description: formDesc, 
            users:[{
                uid:'',
                userAvatar:'',
                userName:''
            }]
        })
        setFormName('');
        setFormDesc('');
    }
    return (
        <div>
            <span>Add Channel</span>
            <form onSubmit={addChannel}>
                <input type="text" value={formName} onChange={e => setFormName(e.target.value)}/>
                <input type="textarea" value={formDesc} onChange={e => setFormDesc(e.target.value)}/>
                <button type="submit" disabled={!formName}>🕊️</button>
            </form>      
        </div>
    );
}

export default ChannelAdd;
