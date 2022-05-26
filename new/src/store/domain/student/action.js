import * as actionTypes from "./actionType";

export const setAuth = (data) => {
    return {
        type: actionTypes.SET_AUTH,
        value: data
    }
};
export const setUserType = (data) => {
    return {
        type: actionTypes.SET_USER_TYPE,
        value: data
    }
};
export const setUser = (data) => {
    return {
        type: actionTypes.SET_USER,
        value: data
    }
};
export const setLoginStatus = (data) => {
    return {
        type: actionTypes.SET_LOGIN_STATUS,
        value: data
    }
};
export const setCategory = (data) => {
    return {
        type: actionTypes.CATEGORY,
        value: data
    }
};

export const setStudentData = (data) => {
    return {
        type: actionTypes.SET_STUDENT_DATA,
        value: data
    }
};

export const setClassData = (data) => {
    return {
        type: actionTypes.SET_CLASS_DATA,
        value: data
    }
};

