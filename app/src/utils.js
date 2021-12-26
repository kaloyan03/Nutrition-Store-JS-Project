function saveUserToSessionStorage(email, accessToken, id) {
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('accessToken', accessToken);
    sessionStorage.setItem('id', id);
}

function clearSessionStorage() {
    sessionStorage.clear();
}

function getAccessToken() {
    return sessionStorage.getItem('accessToken');
}

function getUserEmail() {
    return sessionStorage.getItem('email');
}

function getUserId() {
    return sessionStorage.getItem('id');
}

export { 
    saveUserToSessionStorage,
    clearSessionStorage,
    getAccessToken,
    getUserEmail,
    getUserId,
}



