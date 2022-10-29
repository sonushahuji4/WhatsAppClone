import { useReducer, useEffect } from "react";

const usePersistedReducer = (reducer: any, initialState: object, key: string): any => {
    
    /*let currentState: object;

    try {
        const storedState: any = JSON.parse(window.localStorage.getItem('state') as any);
        const storedStateExpiresIn: number = Number(window.localStorage.getItem('stateExpiresIn') as any);
        currentState = storedState && storedState[key] && storedStateExpiresIn && Date.now() < storedStateExpiresIn ? storedState[key] : initialState;
    } catch(error) {
        currentState = initialState;
    }*/

    const [state, dispatch]: any = useReducer<any>(reducer, initialState);

    useEffect(() => {
        window.localStorage.setItem('state', JSON.stringify({[key]: state}));
        window.localStorage.setItem('stateExpiresIn', String(Date.now() + (30*24*60*60))); /** Timestamp for expiry date (aafter 30days) */
    }, [state]);

    return [state, dispatch];
}

export default usePersistedReducer;