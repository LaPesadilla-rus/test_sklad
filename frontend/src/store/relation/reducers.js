const defState = {
    kat: { model1: '', model2: ''},
    type: { model1: '', model2: ''},
    marka: { model1: '', model2: ''},
    model: { model1: '', model2: ''},

};

export const relationReducer = (state = defState, action) => {
    switch (action.type){
        case 'RELATION_CHANGE_KAT_TEXT':    if (action.id === '1'){
                                            return {...state, kat: { model1: action.payload , model2: state.kat.model2}};
                                            }
                                            if (action.id === '2') {
                                                return {...state, kat: { model1: state.kat.model1, model2: action.payload}};
                                            }
                                            break;
        case 'RELATION_CHANGE_TYPE_TEXT':   if (action.id === '1'){
                                            return {...state, type: { model1: action.payload , model2: state.type.model2}};
                                            }
                                            if (action.id === '2') {
                                                return {...state, type: { model1: state.type.model1, model2: action.payload}};
                                            }
                                            break;
        case 'RELATION_CHANGE_MARKA_TEXT':  if (action.id === '1'){
                                                return {...state, marka: { model1: action.payload , model2: state.marka.model2}};
                                            }
                                            if (action.id === '2') {
                                                return {...state, marka: { model1: state.marka.model1, model2: action.payload}};
                                            }
                                            break;
        case 'RELATION_CHANGE_MODEL_TEXT':  if (action.id === '1'){
                                                return {...state, model: { model1: action.payload , model2: state.model.model2}};
                                            }
                                            if (action.id === '2') {
                                                return {...state, model: { model1: state.model.model1, model2: action.payload}};
                                            }
                                            break;
        default: return state;
    }
};