export interface Props {
    children?: JSX.Element | null
}

export interface User{
    uid:string
    photoURL:string
    displayName:string
}

export interface Channel {
    id:string
    name:string
    description:string
    users:Array<User>
}

export interface Message {
    text:string
    createAt:string
    user:User
}

export interface ContextValue {
    filteredChannels: Channel[]
    messages: Message[]
    activeChannel: Channel
    setSeletedChannel: (text:string) => void
    setSearchedChannel: (text:string) => void
    setNewChannel: (channel: Channel) => void
    setNewMessage: (text:string) => void
}
 