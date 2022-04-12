const getDistanceBetweenCoords = (lat1, lng1, lat2, lng2, unit = 'Mi') => {
    if(lat1 === undefined || lat2  === undefined || lng1  === undefined || lng2  === undefined){
        return -1
    }else if(lat1 === null || lat2  === null || lng1  === null || lng2  === null){
        return -1
    }

    let theta = lng1 - lng2
    let dist = Math.sin(degToRad(lat1)) * Math.sin(degToRad(lat2)) + Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * Math.cos(degToRad(theta))
    dist = Math.acos(dist) 
    dist = radToDeg(dist) 
    dist = dist * 60 * 1.1515

    switch(unit) 
    { 
        case 'Mi': break;
        case 'Km' : dist = dist * 1.609344; 
    }

    return Math.round(dist, 2); 
}

const degToRad = (degrees) => {
    var pi = Math.PI;
    return degrees * (pi/180);
}

const radToDeg = (radians) => {
    var pi = Math.PI;
    return radians * (180/pi);
}

module.exports = { getDistanceBetweenCoords }