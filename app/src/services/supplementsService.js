import * as url from '../api/urls.js';
import * as requester from '../api/requester.js';


export function getSupplements() {return requester.get(url.supplementsUrl)}; 
export function addSupplement(data) {return requester.post(url.addSupplementUrl, data)}; 
export function getSupplement(id) {return requester.get(url.getSupplementUrl(id))}; 
export function updateSupplement(id, data) {return requester.put(url.updateSupplementUrl(id), data)}; 
export function deleteSupplement(id) {return requester.del(url.deleteSupplementUrl(id))}; 