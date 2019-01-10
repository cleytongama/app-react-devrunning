import {
    createReducer
} from 'reduxsauce'
import {
    Types
} from '../actionCreators'

export const INITIAL_STATE = {
    isAuthing: false,
    isAuth: false,
    isSigningin: false,
    isSaving: false,
    user: {},
    saved: false,
    error: false,
    errorMessage: ''
}

export const signinRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isSigningin: true,
        error: false,
        errorMessage: ''
    }
}

export const signinSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        user: action.user,
        isSigningin: false,
        isAuth: true,
        error: false
    }
}

export const signinFailure = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isSigningin: false,
        error: true,
        errorMessage: action.error
    }
}

// AUTH

export const authRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isSigningin: true,
        error: false,
        errorMessage: action.error
    }
}
export const authSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        user: action.user,
        isSigningin: false,
        isAuth: true,
        error: false
    }
}
export const authFailure = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isSigningin: false,
        isAuth: false,
        error: true,
        errorMessage: action.error
    }
}

export const destroyAuthRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        user: {},
        isSigningin: false,
        isAuth: false,
        error: false
    }
}

export const updateProfileRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isSaving: true,
        error: false,
        errorMessage: '',
        saved: false
    }
}

export const updateProfileSuccess = (state = INITIAL_STATE, action) => {

    const newUser = {
        ...state.user
    }

    console.log("Old", state.user)

    Object.keys(action.user).forEach(key => {
        newUser[key] = action.user[key]
    })
    console.log("New", newUser)

    return {
        ...state,
        user: newUser,
        isSaving: false,
        error: false,
        saved: true
    }
}

export const updateProfileFailure = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isSaving: false,
        error: true,
        errorMessage: action.error,
        saved: false
    }
}
export const updateProfileReset = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        saved: false
    }
}


export const createProfileRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isSaving: true,
        error: false,
        errorMessage: '',
        saved: false
    }
}
export const createProfileSuccess = (state = INITIAL_STATE, action) => {
    const newUser = {
        ...state.user
    }

    console.log("Old", state.user)

    Object.keys(action.user).forEach(key => {
        newUser[key] = action.user[key]
    })
    console.log("New", newUser)

    return {
        ...state,
        user: newUser,
        isSaving: false,
        error: false,
        saved: true
    }
}
export const createProfileFailure = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isSaving: false,
        error: true,
        errorMessage: action.error,
        saved: false
    }
}
export const createProfileReset = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        saved: false
    }
}

export const HANDLERS = {
    [Types.SIGNIN_REQUEST]: signinRequest,
    [Types.SIGNIN_SUCCESS]: signinSuccess,
    [Types.SIGNIN_FAILURE]: signinFailure,

    [Types.AUTH_REQUEST]: authRequest,
    [Types.AUTH_SUCCESS]: authSuccess,
    [Types.AUTH_FAILURE]: authFailure,

    [Types.DESTROY_AUTH_SUCCESS]: destroyAuthRequest,

    [Types.UPDATE_PROFILE_REQUEST]: updateProfileRequest,
    [Types.UPDATE_PROFILE_SUCCESS]: updateProfileSuccess,
    [Types.UPDATE_PROFILE_FAILURE]: updateProfileFailure,
    [Types.UPDATE_PROFILE_RESET]: updateProfileReset,


    [Types.CREATE_PROFILE_REQUEST]: createProfileRequest,
    [Types.CREATE_PROFILE_SUCCESS]: createProfileSuccess,
    [Types.CREATE_PROFILE_FAILURE]: createProfileFailure,
    [Types.CREATE_PROFILE_RESET]: createProfileReset

}

export default createReducer(INITIAL_STATE, HANDLERS)