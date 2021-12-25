import * as url from '../api/urls.js';
import * as requester from '../api/requester.js';


export function loginUser(data) {return requester.post(url.loginUrl, data)}; 
export function registerUser(data) {return requester.post(url.registerUrl, data)}; 
export function logoutUser() {return requester.get(url.logoutUrl)}; 