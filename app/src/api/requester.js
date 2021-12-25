function request(url, options) {
    return fetch(url, options)
    .then(body => body.json())
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

    return options;
}

export function get(url) {return request(url, createOptions())};  
export function post(url, data) {return request(url, createOptions('POST', data))};  
export function put(url, data) {return request(url, createOptions('PUT', data))};  
export function del(url, data) {return request(url, createOptions('DELETE', data))};  

