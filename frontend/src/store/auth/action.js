export const RELATION_CHANGE_USER_ID = 'RELATION_CHANGE_USER_ID';
export const RELATION_CHANGE_AT = 'RELATION_CHANGE_AT';
export const RELATION_CHANGE_RT = 'RELATION_CHANGE_RT';
export const AUTH_CHANGE_STATUS = 'AUTH_CHANGE_STATUS';
export const AUTH_CHANGE_USER_NAME = 'AUTH_CHANGE_USER_NAME';
export const AUTH_CHANGE_USER_ROLE = 'AUTH_CHANGE_USER_ROLE';

export const setUserId = (val) => ({
    type: 'RELATION_CHANGE_USER_ID',
    payload: val
});

export const setAt = (val) => ({
    type: 'RELATION_CHANGE_AT',
    payload: val
});

export const setRt = (val) => ({
    type: 'RELATION_CHANGE_RT',
    payload: val
});

export const setAuthorize = (val) => ({
    type: 'AUTH_CHANGE_STATUS',
    payload: val
});

export const setUserName = (val) => ({
    type: 'AUTH_CHANGE_USER_NAME',
    payload: val
});

export const setUserRole = (val) => ({
    type: 'AUTH_CHANGE_USER_ROLE',
    payload: val
});
