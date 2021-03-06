import reducer from "./auth";

import * as actionTypes from "../actions/actionTypes";

describe('auth reducer', ()=> {
    it('should return to initial state', ()=> {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: "/"
        })

    });

    it('should store the token upon log in', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: "/"
        }, {
            type: actionTypes.AUTH_SUCCESS,
            idToken: "some-token",
            userId: "someId"
        })).toEqual({
            
            token: "some-token",
            userId: "someId",
            error: null,
            loading: false,
            authRedirectPath: "/"
        })
    })

})