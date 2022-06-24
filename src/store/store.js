import { createStore } from 'redux';
const initialState = {
    isAuth: false,
    token: '',
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'Auth':
            return {
                ...state,
                isAuth: true,
                token: action.payload
            };
        case 'OUT':
            return {
                ...state,
                isAuth: false,
                token: '',
            };
        default:
            return state;
    }
}

export const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

