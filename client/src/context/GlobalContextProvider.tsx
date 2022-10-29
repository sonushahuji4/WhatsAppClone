import React from "react";
import { reducer, initialState } from './reducer';
import usePersistedReducer from "../hooks/usePersistedReducer";

interface Action {
    type: string;
    value: any;
}

interface InitContextProps  { 
    payload: any;
    dispatch: React.Dispatch<React.SetStateAction<Action>>;
}

export const GlobalStateContext = React.createContext({});
export const GlobalDispatchContext = React.createContext({} as InitContextProps);


const GlobalContextProvider = ({children}: any) => {
    const [state, dispatch] = usePersistedReducer(reducer, initialState, "authoer");
    
    return (
        <GlobalStateContext.Provider value={state}>
            <GlobalDispatchContext.Provider value={dispatch}>
                {children}
            </GlobalDispatchContext.Provider>
        </GlobalStateContext.Provider>
    );
}

export default GlobalContextProvider;