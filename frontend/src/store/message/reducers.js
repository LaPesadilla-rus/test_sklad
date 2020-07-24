const defState = {
    message_state: false,
    txt: 'Default Message',
    color: 2
};

export const messageReducer = (state = defState, action) => {
    switch (action.type){
        case 'MESSAGE_SHOW':     return {...state, message_state: action.payload, txt: action.txt, color: action.color};
        case 'MESSAGE_HIDE':     return {...state, message_state: action.payload, txt: '', color: 0};
        default: return state;
    }
};