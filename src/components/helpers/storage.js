let storage = {};

storage.checkToken = () => {
    return localStorage.getItem('token') ? true : false;
}

storage.getToken = () => {
    return localStorage.getItem('token');
}

storage.checkUserID = () => {
    return localStorage.getItem('userId') ? true : false;
}

storage.getUserID = () => {
    return localStorage.getItem('userId');
}

storage.checkRestaurantID = () => {
    return localStorage.getItem('restaurant') ? true : false;
}

storage.getRestaurantID = () => {
    return localStorage.getItem('restaurant');
}

storage.checkUserEmail = () => {
    return localStorage.getItem('userEmail') ? true : false;
}

storage.getUserEmail = () => {
    return localStorage.getItem('userEmail');
}

storage.getConfig = () => {

    const config = {
        headers: {
            ContentType: 'application/json'
        }
    }

    return config;

}

storage.getConfigWithBearer = () => {

    const config = {
        headers: {
            ContentType: 'application/json',
            Authorization: `Bearer ${storage.getToken()}`
        }
    }

    return config;

}

storage.checkSearchQuery = () => {
    return localStorage.getItem('searchQuery') ? true : false;
}

storage.getSearchQuery = () => {
    return localStorage.getItem('searchQuery');
}

storage.getQueryParams = () => {
    return localStorage.getItem('queryParams');
}

storage.checkHex = (input) => {
    var re = /[0-9A-Fa-f]{6}/g;
    let flag = false;

    if(re.test(input)) {
        flag = true;
    } else {
        flag = false;
    }

    console.log(flag, 'the flag')

    re.lastIndex = 0; // be sure to reset the index after using .text()
    return flag
}

storage.checkObject = (obj) => {
    
    if(obj === null){
        return 0;
    }else{
        return Object.keys(obj).length;
    }
}

storage.getFoodItems = () => {

    const fi = JSON.parse(localStorage.getItem('foodItems'));
    return fi;

}

storage.clearAuth = () => {
    
    if(storage.checkToken() && storage.checkUserID()){
        localStorage.clear();
    }
}

storage.setPlate = (data) => {

    const dataStr = JSON.stringify(data);
    localStorage.setItem('plateData', dataStr);

}

storage.getPlate = () => {

    if(localStorage.getItem('plateData') !== null || localStorage.getItem('plateData') !== undefined || localStorage.getItem('plateData') !== ''){
        const plates = JSON.parse(localStorage.getItem('plateData'));
        // console.log(plates)
        return plates;
    }else{
        return null;
    }

}

storage.keep = (key, data) => {

    if(data && data !== undefined && data !== null){
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    }else{
        return false
    }
    
}

storage.fetch = (key) => {

    const data = JSON.parse(localStorage.getItem(key))
    return data;
}

storage.delete = (key) => {
    
    const data = storage.fetch(key);

    if(data && data !== null && data !== undefined){
        localStorage.removeItem(key)
        return true;
    }else{
        return false;
    }
}

export default storage;