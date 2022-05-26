import ApiService from './apiService';
let STUDENT_SUMMARY = (paginationIndex, paginationSize) => `public_user/users/all?pageNo=${paginationIndex}&pageSize=${paginationSize}`;
let STUDENT_SUMMARY_FILTER = (paginationIndex, paginationSize) => `public_user/filter?pageNo=${paginationIndex}&pageSize=${paginationSize}`;


async function studentsummary(paginationIndex, paginationSize) {
    const apiObject = {};
    apiObject.method = 'GET';
    apiObject.authentication = true;
    apiObject.endpoint = STUDENT_SUMMARY(paginationIndex, paginationSize);
    apiObject.body = null;
    apiObject.type = false;
    return await ApiService.callApi(apiObject);
}

async function student_summery_filter(paginationIndex, paginationSize, obj) {
    const apiObject = {};
    apiObject.method = 'POST';
    apiObject.authentication = true;
    apiObject.endpoint = STUDENT_SUMMARY_FILTER(paginationIndex, paginationSize);
    apiObject.body = obj;
    apiObject.type = false;
    return await ApiService.callApi(apiObject);
}

export default { studentsummary, student_summery_filter };
