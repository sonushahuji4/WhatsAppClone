export interface IMessage {
    senderId : string;
    receiverId : string;
    msg? : any;
}

export interface message {
    _id? : Object;
    senderId?: string;
    uniqueId : string;
    msg: any;
}