import {firestore, FieldValue} from '../services/firebase'
import {Channel, Message, User} from './interface'

export function getChannels(setChannels:Function):void  {
    firestore
        .collection('channels')
        .orderBy('name')
        .onSnapshot(snapShot => {
            const tempChannels:Array<Channel> = []
            snapShot.forEach(change => 
                tempChannels.push({
                    id: change.id,
                    name: change.data().name, 
                    description: change.data().description,
                    users: change.data().users
                })
            )
            setChannels(tempChannels)
        })
}

export function getWelcomeChannel(setSeletedChannel:Function) {
    firestore
    .collection('channels')
    .where('name', '==', 'Welcome')
    .limit(1)
    .get()
    .then(snapShot => {
        setSeletedChannel(snapShot.docChanges()[0].doc?.id)      
    })
}
export function getChannel(seletedChannel:string, setActiveChannel:Function) {
    firestore
        .collection('channels')
        .doc(seletedChannel)
        .onSnapshot(snapShot => {
            localStorage.setItem('selectedChannel', snapShot?.id)
            setActiveChannel({
                id: snapShot?.id,
                name: snapShot?.data()?.name,
                description: snapShot?.data()?.description,
                users: snapShot?.data()?.users
            })
        })
}
export function addChannel(setSeletedChannel:Function, setNewChannel:Function,newChannel:Channel, user:User) {
    firestore
        .collection('channels')
        .add({
            name: newChannel.name,
            description:  newChannel.description,
            users: [{
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL
            }]
        })
        .then(imNew => {
            setSeletedChannel(imNew.id)
        })
    setNewChannel({id:'', name:'', description:'', users:[{} as User]})
}
export function getMessages(seletedChannel:string, setMessages:Function, setLoading:Function) {
    firestore
        .collection('channels')
        .doc(seletedChannel)
        .collection('messages')
        .orderBy('createAt', 'asc')
        .onSnapshot(snapShot => {
            const tempMessages:Array<Message> = []
            snapShot.forEach(change => 
                tempMessages.push(change.data() as Message)
            )
            setMessages(tempMessages)
            setLoading(false)
        })
}

export function sendMessage(newMessage:string, seletedChannel:string, user:User) {
    firestore
        .collection('channels')
        .doc(seletedChannel)
        .collection('messages')
        .add({
            text: newMessage,
            createAt:  FieldValue().serverTimestamp(),
            user: {
                uid: user?.uid,
                displayName: user?.displayName,
                photoURL: user?.photoURL,
            }
        })
}
export function addUserToChannel(seletedChannel:string, user:User) {
    firestore
        .collection('channels')
        .doc(seletedChannel)
        .get()
        .then((doc) => {
            const data = doc?.data()
            if(!data?.users?.includes(user.uid)){
                firestore
                    .collection('channels')
                    .doc(seletedChannel)
                    .update({
                        users: FieldValue().arrayUnion({
                                uid:user.uid,
                                displayName:user.displayName, 
                                photoURL:user.photoURL
                            }
                        )
                    })                                               
            }
        })
}