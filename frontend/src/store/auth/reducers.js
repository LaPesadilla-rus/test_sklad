const defState = {
    user: '000',
    at: 'not valid',
    rt: 'not valid',
    isAuthorize: false,
    userName: 'default',
    role: 'default',
};

export const authReducer = (state = defState, action) => {
    switch (action.type){
        case 'RELATION_CHANGE_USER_ID':     return {...state, user: action.payload};
        case 'RELATION_CHANGE_AT':          return {...state, at: action.payload};
        case 'RELATION_CHANGE_RT':          return {...state, rt: action.payload};
        case 'AUTH_CHANGE_STATUS':          return {...state, isAuthorize: action.payload};
        case 'AUTH_CHANGE_USER_NAME':          return {...state, userName: action.payload};
        case 'AUTH_CHANGE_USER_ROLE':          return {...state, role: action.payload};
        default: return state;
    }
};