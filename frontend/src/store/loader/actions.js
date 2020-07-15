export const LOADER_SHOW = 'LOADER_SHOW';
export const LOADER_HIDE = 'LOADER_HIDE';


export const setLoaderShow = () => ({
    type: 'LOADER_SHOW',
    payload: true
});

export const setLoaderHide = () => ({
    type: 'LOADER_HIDE',
    payload: false
});
