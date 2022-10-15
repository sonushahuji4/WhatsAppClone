import * as actions from './actions';

export const initialState = {
    authorDetails : {
        userId : null,
        name : null,
        email : null,
        email_verified : false,
        picture: null
    },
    usersContactList : [],
    chatHistory : [],
};

export const reducer = (state: any, action: any) => {
    switch(action.type) {
        case actions.AUTHOR_DETAILS:
            return {
                ...state,
                authorDetails:action.payload.user,
                usersContactList: action.payload.userList
        }
        case actions.USERS_LIST:
            return {
                ...state,
                usersContactList: action.payload
            }
        case actions.CHAT_HISTORY:
            return {
                ...state,
                chatHistory: action.payload
            }
        // case actions.UPDATE_CHAT_HISTORY:
        //     return {
        //         ...state,
        //         chatHistory: 
        //     }
        default: {
            return state;
        }
    }
}