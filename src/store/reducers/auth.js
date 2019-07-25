import * as actionTypes from '../actions/actionsTypes';

import { updateObject} from "../utility";

const initialSate = {
    token : null,
    userId : null,
    error : null,
    loading : false
}

const authStart = (state,action) =>{
    return updateObject((state,{error : null,loading : true}))
};

const authSuccess = (state,action) =>{
    return updateObject((state,{
        token : action.token,
        userId : 99999,
        error : null,
        loading : false
    }))
};

const authFail = (state ,action) =>{
    return updateObject((state,{
        error : action.message,
        loading : false
    }))
};

const reducer = (state= initialSate ,action) => {
    switch(action.type){
        case actionTypes.AUTH_START : return authStart(state,action);
        case actionTypes.AUTH_SUCCESS : return authSuccess(state,action);
        case actionTypes.AUTH_FAIL : return authFail(state,action);
        default : return state;
    }
};

export default reducer;