import ApiService from './apiService';
let CLASS_SUMMARY = `machinery/machine`;
let CLASS_SUMMARY_FILTER = (paginationIndex, paginationSize) => `class/filter?pageNo=${paginationIndex}&pageSize=${paginationSize}`;
let CREATE_CLASS = `machinery/machine`
let Update_CLASS = `class/update`
let CLASS_STATUS_CHANGE = `machinery/machine`
let TEACHER_BY_NAME = `class/teacher`




async function classsummary() {
    const apiObject = {};
    apiObject.method = 'GET';
    apiObject.authentication = false;
    apiObject.endpoint = CLASS_SUMMARY;
    apiObject.body = null;
    apiObject.type = false;
    return await ApiService.callApi(apiObject);
}

async function find_teacher_by_name() {
    const apiObject = {};
    apiObject.method = 'GET';
    apiObject.authentication = true;
    apiObject.endpoint = TEACHER_BY_NAME;
    apiObject.body = null;
    apiObject.type = false;
    return await ApiService.callApi(apiObject);
}

async function create_class(obj) {
    const apiObject = {};
    apiObject.method = 'POST';
    apiObject.authentication = false;
    apiObject.endpoint = CREATE_CLASS;
    apiObject.body = obj;
    apiObject.type = false;
    return await ApiService.callApi(apiObject);
}

async function class_summery_filter(paginationIndex, paginationSize, obj) {
    const apiObject = {};
    apiObject.method = 'POST';
    apiObject.authentication = true;
    apiObject.endpoint = CLASS_SUMMARY_FILTER(paginationIndex, paginationSize);
    apiObject.body = obj;
    apiObject.type = false;
    return await ApiService.callApi(apiObject);
}

async function update_class(obj) {
    const apiObject = {};
    apiObject.method = 'PUT';
    apiObject.authentication = true;
    apiObject.endpoint = Update_CLASS;
    apiObject.body = obj;
    apiObject.type = false;
    return await ApiService.callApi(apiObject);
}

async function change_status(obj) {
    const apiObject = {};
    apiObject.method = 'PATCH';
    apiObject.authentication = false;
    apiObject.endpoint = CLASS_STATUS_CHANGE;
    apiObject.body = obj;
    apiObject.type = false;
    return await ApiService.callApi(apiObject);
}

export default { classsummary, class_summery_filter, create_class, change_status, find_teacher_by_name, update_class };
