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

function getCartSupplements() {
    return JSON.parse(sessionStorage.getItem('supplementsInCart'));
}

function addSupplementIdToLocalstorage(supplementId) {
    let supplements = getCartSupplements();

    if (supplements) {
        supplements.push(supplementId);
        sessionStorage.setItem('supplementsInCart', JSON.stringify(supplements))

    } else {
        let supplements = [ supplementId ]
        sessionStorage.setItem('supplementsInCart', JSON.stringify(supplements))
    }
}

export { 
    saveUserToSessionStorage,
    clearSessionStorage,
    getAccessToken,
    getUserEmail,
    getUserId,
    getCartSupplements,
    addSupplementIdToLocalstorage,
}



