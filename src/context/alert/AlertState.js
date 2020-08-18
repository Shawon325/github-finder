import { REMOVE_ALERT, SET_ALERT } from '../types';
import React, { useReducer } from 'react';

import AlertContext from './alertContext';
import AlertReducer from './alertReducer';

const AlertState = props => {
    const initialState = '';

    const [state, dispatch] = useReducer(AlertReducer, initialState);

    //Show alert message
    const searchAlert = (message, type) => {
        dispatch({
            type: SET_ALERT,
            payload: { message, type },
        });
        setTimeout(() => dispatch({ type: REMOVE_ALERT }), 5000);
    };

    return (
        <AlertContext.Provider
            value={{
                alert: state,
                searchAlert,
            }}>
            {props.children}
        </AlertContext.Provider>
    );
};

export default AlertState;
