import {
    put
} from 'redux-saga/effects'

import ActionCreators from '../actionCreators'

import axios from 'axios'

import jwtDecode from 'jwt-decode'

export function* login(action) {
    let token = localStorage.getItem('token')

    const login = yield axios.post('http://localhost:3005/users/login', {
        email: action.email,
        passwd: action.passwd
    })

    if (login.data.token) {
        token = login.data.token
        localStorage.setItem('token', token)

        const user = jwtDecode(token)
        localStorage.setItem('user', user)

        yield put(ActionCreators.signinSuccess(user))

    } else {

        yield put(ActionCreators.signinFailure(login.data.message))
    }
}

export function* auth() {
    const token = localStorage.getItem('token')

    if (token) {
        try {
            // const user = jwtDecode(token)
            const user = yield axios.get('http://localhost:3005/users/me', {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            yield put(ActionCreators.authSuccess(user.data))
        } catch (err) {

            yield put(ActionCreators.authFailure('invalide token'))
        }

    } else {
        yield put(ActionCreators.authFailure('no token'))
    }
}

export function* updateProfile(action) {
    const token = localStorage.getItem('token')
    const userToSave = {
        ...action.user
    }


    const user = yield axios.patch(`http://localhost:3005/users/${action.user.id}`, userToSave, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })

    yield put(ActionCreators.updateProfileSuccess(userToSave))
}

export function* createProfile(action) {

    const userToSave = {
        ...action.user
    }

    const user = yield axios.post(`http://localhost:3005/users`, userToSave)

    if (user.data.error) {

        yield put(ActionCreators.createProfileFailure(user.data))
    } else {

        yield put(ActionCreators.createProfileSuccess(userToSave))

        yield put(ActionCreators.signinRequest(userToSave.email, userToSave.passwd))
    }
}

export function* destroyAuth() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    yield put(ActionCreators.destroyAuthSuccess())

}