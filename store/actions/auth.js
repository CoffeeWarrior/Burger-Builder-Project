import * as actionTypes from "./actionTypes"
import axios from "axios";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}

export const authFailure = (error) => {
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return{
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationDate) => {
    return dispatch => {
        setTimeout(()=> {
            dispatch(logout());
        }, expirationDate * 1000);
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBC_lju1kSzsvVzi2EgXBMhJokH7Aj1ask";
        if (!isSignup){
            url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBC_lju1kSzsvVzi2EgXBMhJokH7Aj1ask";
        }
        dispatch(authStart());
        axios.post(url, authData)    
        .then(response => {
            console.log(response);
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn*1000);
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('userId', response.data.localId);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(err => {
            console.log(err);
            dispatch(authFailure(err.response.data.error));
        })
    }
}

export const setAuthRedirectPath = (path) => {
    return{
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        }
        const expirationDate = new Date(localStorage.getItem("expirationDate"));
        
        if(expirationDate > new Date()){
            const userId = localStorage.getItem("userId");
            dispatch(authSuccess(token, userId));
            dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
        } else {
            dispatch(logout());
        }
        
        
    }
}