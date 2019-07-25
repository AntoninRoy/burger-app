import *as actionTypes from './actionsTypes';
import axios from '../../axios-orders';
import {fetchIngredientFailed, setIngredients} from "./burgerBuilder";

export const authStart = () => {
    return {
        type : actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type : actionTypes.AUTH_SUCCESS,
        authData : authData
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
                dispatch(authSuccess(response.data));
                console.log(response);
            })
            .catch(error =>{
               dispatch(authFail(error.response));
               console.log(error.response)
            });
    }
}
