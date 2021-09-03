import React from 'react'
import { Transition } from '@headlessui/react'
import { ChannelsProvider } from '../contexts/ChannelsContext'
import ChannelAdd from '../components/ChannelAdd'
import ChannelList from '../components/ChannelList'
import ChannelSearch from '../components/ChannelSearch'
import ChannelDescription from '../components/ChannelDescription'
import Messages from '../components/Messages'
import MessageSend from '../components/MessageSend'
import User from '../components/User'
import chevronLeftIcon from '../assets/chevron-left.svg'
import plusIcon from '../assets/plus.svg'
import menuIcon from '../assets/menu.svg'
import closeIcon from '../assets/close.svg'

const Chats: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [showChannels, setShowChannels] = React.useState(true);
    const [isSideOpen, setIsSideOpen] = React.useState(false);
    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
        setIsSideOpen(false)
    }

    return (
        <ChannelsProvider>
            <>
                <div className="flex w-full h-screen max-h-screen bg-gray-700 text-white">
                    <div
                        className={isSideOpen
                            ? 'translate-x-0 z-20 transition ease-in-out duration-300 absolute sm:relative sm:translate-x-0 flex flex-col  w-80 sm:w-96 bg-gray-800 h-screen'
                            : '-translate-x-full z-20 transition ease-in-out duration-300 absolute sm:relative sm:translate-x-0 flex flex-col w-80 sm:w-96 bg-gray-800 h-screen'}
                    >
                        <div className='flex-1 overflow-hidden'>
                            <Transition show={showChannels} className='h-full'
                                appear={false}>
                                <Transition.Child className='h-full'
                                    enter="transition ease-in-out duration-300 transform"
                                    enterFrom="-translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transition ease-in-out duration-300 transform"
                                    leaveFrom="translate-x-0"
                                    leaveTo="-translate-x-full"
                                >
                                    <div className="flex flex-col h-full">
                                        <div className="flex py-5 px-5 items-center justify-between shadow-md text-xl">
                                            <p className='font-medium'>Channels</p>
                                            <button
                                                className="w-6 h-6 flex justify-center items-center bg-gray-600 rounded"
                                                onClick={openModal}
                                            >
                                                <img className='w-5 h-5' src={plusIcon} alt="Add Channel" />
                                            </button>
                                            <ChannelAdd isOpen={isOpen} closeModal={closeModal} />
                                        </div>
                                        <ChannelSearch />
                                        <ChannelList setIsSideOpen={setIsSideOpen}  setShowChannels={setShowChannels} />
                                    </div>
                                </Transition.Child>
                            </Transition>
                            <Transition show={!showChannels} className='h-full' appear={false}>
                                <Transition.Child className='h-full'
                                    enter="transition ease-in-out duration-300 transform"
                                    enterFrom="-translate-x-0"
                                    enterTo="translate-x-full"
                                    leave="transition ease-in-out duration-300 transform"
                                    leaveFrom="translate-x-full"
                                    leaveTo="-translate-x-0"
                                >
                                    <div className="flex flex-col h-full">
                                        <button
                                            className="flex py-5 px-5 gap-4 items-center shadow-md text-xl"
                                            onClick={() => setShowChannels(true)}
                                        >
                                            <img className='w-5 h-5' src={chevronLeftIcon} alt="All Channels" />
                                            <span className='font-medium'>All Channels</span>
                                        </button>
                                        <ChannelDescription />
                                    </div>
                                </Transition.Child>
                            </Transition>
                        </div>
                        <User />
                    </div>
                    {
                        isSideOpen
                            ?
                            <button
                                className="fixed sm:hidden bg-black opacity-70 h-screen w-screen z-10"
                                onClick={() => setIsSideOpen(false)}
                            >
                                <img className=' fixed w-8 h-8 ml-2 top-5 left-80 ' src={closeIcon} alt="" />
                            </button>
                            :
                            <button
                                className="absolute sm:hidden top-5 left-9"
                                onClick={() => setIsSideOpen(true)}
                            >
                                <img className='w-8 h-8 mr-4' src={menuIcon} alt="" />
                            </button>
                    }

                    <div className="flex flex-col w-full h-screen">
                        <div className="flex flex-col flex-1 h-full">
                            <Messages />
                            <MessageSend />
                        </div>
                    </div>
                </div>

            </>
        </ChannelsProvider>
    );
}

export default Chats;
