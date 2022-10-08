import * as actions from './actions';

export const initialState = {
    authorDetails : {
        authorId : null,
        name : null,
        email : null,
        picture: null
    }
};

export const reducer = (state: any, action: any) => {
    switch(action.type) {
        case actions.AUTHOR_DETAILS:
            return {
                ...state,
                authorDetails:{
                    authorId : action.payload.authorId,
                    name : action.payload.name,
                    email : action.payload.email,
                    picture: action.payload.picture
                }
            }
        default: {
            return state;
        }
    }
}