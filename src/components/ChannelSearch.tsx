import React from 'react';
import { useChannels } from '../contexts/ChannelsContext';
import SearchIcon from '../assets/search.svg'

const ChannelSearch = () => {    
    const { setSearchedChannel } = useChannels()
    const [formValue, setFormValue] = React.useState('')

    const searchHandle:React.ChangeEventHandler<HTMLInputElement> = async (e) => {
        setFormValue(e.target.value)
        setSearchedChannel(e.target.value)
    }

    return (
        <div className="flex px-5 mt-3 mb-5 items-center justify-between">
            <form className="flex w-full gap-2 items-center">
                <img 
                    className="w-4 h-4 fill-current -mr-8 z-10" 
                    src={SearchIcon} alt="Search" />
                <input 
                    className='flex-1 w-full bg-gray-600 rounded  pl-10 pr-4 py-2 border rounded-lg text-white border-gray-600 focus:outline-none focus:border-green-500' 
                    type="text" 
                    value={formValue} 
                    onChange={searchHandle}
                    placeholder='Search'
                />
            </form>               
        </div>
    );
}

export default ChannelSearch;
