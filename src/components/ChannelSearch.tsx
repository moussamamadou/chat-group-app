import React from 'react';
import { useChannels } from '../contexts/ChannelsContext';

const ChannelSearch = () => {    
    const { setSearchedChannel } = useChannels()
    const [formValue, setFormValue] = React.useState('')

    const searchHandle:React.ChangeEventHandler<HTMLInputElement> = async (e) => {
        setFormValue(e.target.value)
        setSearchedChannel(e.target.value)
    }

    return (
        <div>
        <form>
            <input type="text" value={formValue} onChange={searchHandle}/>
        </form>    
            
        </div>
    );
}

export default ChannelSearch;
