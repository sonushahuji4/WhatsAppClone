export interface user {
    _id? : object;
    userId : string;
    name : string;
    email : string;
    email_verified : boolean;
    picture : string;
}

export interface chatsIDs {
    senderId : string;
    receiverId : string;
}