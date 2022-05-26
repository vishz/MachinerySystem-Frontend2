import axios from 'axios';
import apiConfig from './apiConfig';
import Cookies from 'js-cookie'
import * as common from '../constants/commonMessage'
import { Cookie } from '../constants/Storage-Cookie/Cookie';
import qs from 'qs';
import * as config from '../constants/constants';

async function callApi(apiObject) {
    let body = {};
    let headers;
    let method = apiObject.method ? apiObject.method.toLowerCase() : 'get';
    if (method === 'post' || method === 'put' || method === 'patch') {
        if (!apiObject.multipart) {
            if (apiObject.type) {
                body = apiObject.body ? qs.stringify(apiObject.body) : {};
            } else {
                body = apiObject.body ? JSON.stringify(apiObject.body) : {};
            }
        } else {
            body = apiObject.body ? apiObject.body : {};
        }
    }

    headers = {
        'Content-Type': apiObject.multipart ? 'multipart/form-data' : apiObject.urlencoded ? 'application/x-www-form-urlencoded' : 'application/json'
    };
    if (apiObject.authentication) {
        if (apiObject.type) {
            headers.authorization = 'Basic QWRtaW5pc3RyYXRvcjo='
            headers.grant_type = 'password'
        } else {
            headers.Authorization = 'Bearer ' + Cookies.get(Cookie.ACCESSTOKEN)
        }
    }

    let serverUrl = apiConfig.serverUrl;
    let basePath = apiConfig.basePath;
    let version = '/v1';
    let wookstv = ''

    if (apiObject.basePath) {
        basePath = apiObject.basePath;
    }

    const url = `${serverUrl}/${basePath}${version}/${apiObject.endpoint}`;
    let result;

    await axios[method](url, method !== 'get' && method !== 'delete' ? body : { headers: headers }, { headers: headers })
        .then(async response => {
            result = await response;
        })
        .catch(async error => {
            if (error !== undefined) {
                if (error.response === undefined) {
                    result = await {
                        success: false,
                        status: 2,
                        message: 'Your connection was interrupted',
                        data: null,
                    };
                } else if (error.response.status === 401) {
                    result = await {
                        success: false,
                        status: 2,
                        message: 'Unauthorized',
                        data: null,
                    };

                    // need to re-new token, redirect to login page
                    if (!apiObject.type) {
                        // common.renewToken();
                    }


                } else if (error.response.status === 403) {
                    window.location.href = config.BASE_URL + "/dashboard"
                    result = await {
                        success: false,
                        status: 2,
                        message: 'Access is denied.',
                        data: null,
                    };
                } else if (error.response.status === 417) {
                    result = await {
                        success: false,
                        status: 2,
                        message: 'Oops! Something went wrong.',
                        data: null,
                    };
                } else if (error.response.data !== undefined) {
                    result = await {
                        success: false,
                        status: 0,
                        message: error.response.data.message,
                        data: null,
                    };
                } else {
                    result = await {
                        success: false,
                        status: 2,
                        message: 'Sorry, something went wrong.',
                        data: null,
                    };
                }
            } else {
                result = await {
                    success: false,
                    status: 2,
                    message: 'Your connection was interrupted!',
                    data: null,
                };
            }
        });

    return result;
}

export default { callApi };
