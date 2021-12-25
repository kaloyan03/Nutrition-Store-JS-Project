import * as url from '../api/urls.js';
import * as requester from '../api/requester.js';


export function getSupplements() {return requester.get(url.supplementsUrl)}; 