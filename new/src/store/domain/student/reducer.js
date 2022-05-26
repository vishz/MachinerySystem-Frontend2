import * as actionTypes from './actionType';
import constants from "../../../constants/constants";

const initialState = {
    user: null,
    loggedInStatus: false,
    userType: constants.USER_GUEST,
    category: [],
    studentData: {},
    loader: false,
    classData: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_AUTH:
            return {
                ...state,
                loggedInStatus: true,
                user: action.value,
            };
        case actionTypes.SET_USER_TYPE:
            return {
                ...state,
                userType: action.value,
            };
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.value,
            };
        case actionTypes.SET_LOGIN_STATUS:
            return {
                ...state,
                loggedInStatus: action.value,
            };
        case actionTypes.CATEGORY:
            return {
                ...state,
                category: action.value
            };
        case actionTypes.SET_STUDENT_DATA:
            return {
                ...state,
                studentData: action.value
            };
        case actionTypes.SET_CLASS_DATA:
            return {
                ...state,
                classData: action.value
            };
        case actionTypes.LOADER:
            return {
                ...state,
                loader: action.value
            };
        default:
            return state;
    }
};

export default reducer;
