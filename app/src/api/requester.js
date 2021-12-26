import { getAccessToken } from '../utils.js';

function request(url, options) {
    return fetch(url, options)
    .then(response => {
        if (!response.ok) {
            response.json()
            .then(error => {
                const errorMessage = error['message'];
                throw new Error(errorMessage);
            })
            .catch(err => {
                alert(err);
                throw new Error(err);
            })
        } else if (response.status == 204) {
            return response
        } else {
            return response.json();
        }
    })
}

function createOptions(method='GET', data) {
    let options = {
        method,
        headers: {},
    }

    if (data) {
        options['headers']['Content-Type'] = 'application/json';
        options['body'] = JSON.stringify(data);
    }

    // check if is authorized and if is add the X-Authorization token to the option headers
    let accessToken = getAccessToken();
    if (Boolean(accessToken)) {
        options['headers']['X-Authorization'] = accessToken;
    }

    return options;
}

export function get(url) {return request(url, createOptions())};  
export function post(url, data) {return request(url, createOptions('POST', data))};  
export function put(url, data) {return request(url, createOptions('PUT', data))};  
export function del(url, data) {return request(url, createOptions('DELETE', data))};  

