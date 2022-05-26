import {combineReducers} from "redux";
import user from '../domain/student/reducer'

const rootReducer = combineReducers({
    user: user
});

export default rootReducer
