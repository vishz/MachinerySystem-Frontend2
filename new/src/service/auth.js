import ApiService from './apiService';

let ADMIN_LOGIN = `authorize`;

async function adminlogin(userCredentials) {
    const apiObject = {};
    apiObject.method = 'POST';
    apiObject.authentication = true;
    apiObject.endpoint = ADMIN_LOGIN;
    apiObject.body = userCredentials;
    apiObject.type = true;
    apiObject.urlencoded = true;
    apiObject.multipart = false;
    return await ApiService.callApi(apiObject);
}

export default { adminlogin };
