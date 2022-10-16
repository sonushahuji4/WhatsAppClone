import { Socket } from "socket.io-client";
import { SOCKET_STRINGS } from "../constants/contant";

export class WebSocket {

    /** Send request to server to create a new channel for communitcations */
    public static subscribe = (socket: Socket, request: any) => {
        socket.emit(SOCKET_STRINGS.SUBSCRIBE, request);
    }

    /** Send request to server to store chat in database */
    public static dispatchRequest = (socket: Socket, request: any) => {
        socket.emit(SOCKET_STRINGS.DISPATCH, request);
    }

    public static acknowledmentResponse = (socket: Socket) => {
        socket.on(SOCKET_STRINGS.ACKNOWLEDMENT, (res) => {
            return res;
        });
    }

    public static unSubscribe = (socket: Socket, request: any) => {
        socket.emit(SOCKET_STRINGS.UNSUBSCRIBE, request);
    }
}