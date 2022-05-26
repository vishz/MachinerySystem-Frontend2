import ApiService from './apiService';
let DASHBOARD_SUMMARY = `util/dashboard`;


async function dashboardsummary(data) {
    const apiObject = {};
    apiObject.method = 'POST';
    apiObject.authentication = true;
    apiObject.endpoint = DASHBOARD_SUMMARY;
    apiObject.body = data;
    apiObject.type = false;
    return await ApiService.callApi(apiObject);
}

export default { dashboardsummary };
