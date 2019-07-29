import *as actionTypes from './actionsTypes';
import axios from '../../axios-orders';

export const checkAuthTimeout= (expirationTime) => {
    return dispatch => {
        setTimeout(()=>{
            console.log("ICI DANS LE TIMEOUT");
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
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');

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
                    const expirationDate = new Date(new Date().getTime()+ parseInt(response.data.data.expiresIn)*1000);

                    localStorage.setItem('token', response.data.token);;
                    localStorage.setItem('expirationDate',expirationDate);
                    localStorage.setItem('userId',  response.data.data.id);

                    dispatch(authSuccess(response.data.token, response.data.data.id));
                    dispatch(checkAuthTimeout(response.data.data.expiresIn));
                }else{
                    dispatch(authSuccess("notoken", "45"));
                }
            })
            .catch(error =>{
                console.log(error)
               dispatch(authFail(error.response.data.message));

            });
    }
};

export const setAuthRedirectPath =(path) => {
    return {
        type :actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
};
export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate < new Date()){
                dispatch(logout())
            }else{
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token,userId));
                dispatch(checkAuthTimeout((expirationDate.getTime()- new Date().getTime())/1000))
            }

        }
    }
};
