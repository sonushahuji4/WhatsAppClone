export interface IMessage {
    senderId : string;
    receiverId : string;
    messageId? : string;
    uniqueId? : string;
    msg : any;
}