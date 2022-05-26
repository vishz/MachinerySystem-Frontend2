import ApiService from './apiService';


let REPORT_USER_PAYMENT_PAGINATION = (paginationIndex, paginationSize) => `util/user/payment_history?pageNo${paginationIndex}&pageSize=${paginationSize}`
let REPORT_USER_PAYMENT_NO_PAGINATION = `util/user/payment_history/report/download`
let REPORT_CLASS_PAYMENT_PAGINATION = (paginationIndex, paginationSize) => `util/class/payment_history?pageNo${paginationIndex}&pageSize=${paginationSize}`
let REPORT_CLASS_PAYMENT_NO_PAGINATION = `util/class/payment_history/download`


export async function user_payment_pagination(paginationIndex, paginationSize, obj) {
    const apiObject = {};
    apiObject.method = 'POST';
    apiObject.authentication = true;
    apiObject.endpoint = REPORT_USER_PAYMENT_PAGINATION(paginationIndex, paginationSize);
    apiObject.body = obj;
    apiObject.type = false;
    return await ApiService.callApi(apiObject);
}

export async function user_payment_no_pagination(obj) {
    const apiObject = {};
    apiObject.method = 'POST';
    apiObject.authentication = true;
    apiObject.endpoint = REPORT_USER_PAYMENT_NO_PAGINATION;
    apiObject.body = obj;
    apiObject.type = false;
    return await ApiService.callApi(apiObject);
}

export async function class_payment_pagination(paginationIndex, paginationSize, obj) {
    const apiObject = {};
    apiObject.method = 'POST';
    apiObject.authentication = true;
    apiObject.endpoint = REPORT_CLASS_PAYMENT_PAGINATION(paginationIndex, paginationSize);
    apiObject.body = obj;
    apiObject.type = false;
    return await ApiService.callApi(apiObject);
}

export async function class_payment_no_pagination(obj) {
    const apiObject = {};
    apiObject.method = 'POST';
    apiObject.authentication = true;
    apiObject.endpoint = REPORT_CLASS_PAYMENT_NO_PAGINATION;
    apiObject.body = obj;
    apiObject.type = false;
    return await ApiService.callApi(apiObject);
}



export default { user_payment_pagination, user_payment_no_pagination, class_payment_pagination, class_payment_no_pagination };
