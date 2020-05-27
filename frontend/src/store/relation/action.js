export const RELATION_CHANGE_KAT_TEXT = 'RELATION_CHANGE_KAT_TEXT';
export const RELATION_CHANGE_TYPE_TEXT = 'RELATION_CHANGE_TYPE_TEXT';
export const RELATION_CHANGE_MARKA_TEXT = 'RELATION_CHANGE_MARKA_TEXT';
export const RELATION_CHANGE_MODEL_TEXT = 'RELATION_CHANGE_MODEL_TEXT';

export const setKatText = (id,val) => ({
    type: 'RELATION_CHANGE_KAT_TEXT',
    id: id,
    payload: val
});

export const setTypeText = (id,val) => ({
    type: 'RELATION_CHANGE_TYPE_TEXT',
    id: id,
    payload: val
});

export const setMarkaText = (id,val) => ({
    type: 'RELATION_CHANGE_MARKA_TEXT',
    id: id,
    payload: val
});

export const setModelText = (id,val) => ({
    type: 'RELATION_CHANGE_MODEL_TEXT',
    id: id,
    payload: val
});