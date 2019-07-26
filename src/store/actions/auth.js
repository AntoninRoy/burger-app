import *as actionTypes from './actionsTypes';
import axios from '../../axios-orders';
import {updateObject} from "../utility";

export const checkAuthTimeout= (expirationTime) => {
    return dispatch => {
        setTimeout(()=>{
            dispatch(logout());
        },expirationTime*1000);
    }
};
export const authStart = () => {
    return {
        type : actionTypes.AUTH_START
    };
};

export const logout =() => {
    return {
        type : actionTypes.AUTH_LOGOUT
    };
}

export const authSuccess = (token, userId) => {
    return {
        type : actionTypes.AUTH_SUCCESS,
        token : token,
        userId : userId
    };
};

export const authFail = (error) => {
    return {
        type : actionTypes.AUTH_FAIL,
        error : error
    };
};



export  const auth =(email,password,isSignup) => {
    return dispatch => {
        dispatch(authStart());

        let authData = {username : email, password : password};
        let url ='/login_check';
        if(isSignup){
            url = '/users';
            authData ={
                username: email,
                password: password,
                retypedPassword: password,
                email : email,
                name: "le nom"
            }
        }
        axios.post(url,authData)
            .then(response => {
                if(!isSignup){
                    dispatch(authSuccess(response.data.token, response.data.data.id));
                    dispatch(checkAuthTimeout(response.data.data.expiresIn))
                }else{
                    dispatch(authSuccess("notoken", "45"));



                }

                console.log(response);
            })
            .catch(error =>{
               dispatch(authFail(error.response.data));
               console.log(error.response)
            });
    }
}
