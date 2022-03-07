const getDistanceBetweenCoords = (lat1, lng1, lat2, lng2, unit = 'Mi') => {
    if(!lat1 || !lat2 || lng1 || lng2){
        return -1
    }

    const theta = lng1 - lng2
    const dist = Math.sin(degToRad(lat1)) * Math.sin(degToRad(lat2)) + Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * Math.cos(deg2rad(theta))
    dist = Math.acos(dist) 
    dist = radToDeg(dist) 
    dist = dist * 60 * 1.1515

    switch(unit) 
    { 
        case 'Mi': break;
        case 'Km' : dist = dist * 1.609344; 
    }

    return (round(dist, 2)); 
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