const defState = {
    loader_state: false
};

export const loaderReducer = (state = defState, action) => {
    switch (action.type){
        case 'LOADER_SHOW':     return {...state, loader_state: action.payload};
        case 'LOADER_HIDE':     return {...state, loader_state: action.payload};
        default: return state;
    }
};