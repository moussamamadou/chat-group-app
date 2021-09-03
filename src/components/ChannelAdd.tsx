import React from 'react';
import { useChannels } from '../contexts/ChannelsContext';
import { Dialog, Transition } from '@headlessui/react'
interface Props {
    isOpen:boolean,
    closeModal:() => void
}
const ChannelAdd:React.FC<Props> = ({isOpen, closeModal}) => {
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
                photoURL:'',
                displayName:''
            }]
        })
        setFormName('');
        setFormDesc('');
    }
    return (
        <Transition appear show={isOpen} as={React.Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                onClose={closeModal}
            >                
                <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                        as={React.Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-black opacity-70" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>

                    <Transition.Child
                        as={React.Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className=' bg-gray-800 text-white inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
                            <span>Add Channel</span>
                            <form className='flex flex-col items-end' onSubmit={addChannel}>
                                <input 
                                    className='w-full my-2 px-4 py-2 bg-gray-600  border rounded-lg text-white border-gray-600 focus:outline-none focus:border-blue-500'
                                    type="text" 
                                    value={formName} 
                                    placeholder='Channel Name'
                                    onChange={e => setFormName(e.target.value)}/>
                                <textarea 
                                    className='w-full  my-2 px-3 py-2 bg-gray-600 border rounded-lg text-white border-gray-600 focus:outline-none focus:border-blue-500'
                                    value={formDesc}
                                    placeholder='Channel Description'
                                    rows={4}
                                    onChange={e => setFormDesc(e.target.value)}
                                >
                                </textarea>
                                <button 
                                    className='flex justify-center items-center py-2 px-4 bg-blue-600 rounded'
                                    type="submit" disabled={!formName} onClick={closeModal}>Save</button>
                            </form>     
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
      </Transition>
    );
}

export default ChannelAdd;
