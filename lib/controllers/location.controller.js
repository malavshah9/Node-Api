import { findById } from './cabs.controller';
const locationMap = new Map();
const NEARBY_MEASURE = 5;
export const findCabs = (latitude, longitude) => {
    const nearbyCabs = [];
    for (let cab of locationMap.entries()) {
        let currentLocation = cab[1];
        let lowerboundLatitude = currentLocation.latitude - NEARBY_MEASURE;
        let upperboundLatitude = currentLocation.latitude + NEARBY_MEASURE;
        let lowerboundLongitude = currentLocation.longitude - NEARBY_MEASURE;
        let upperboundLongitude = currentLocation.longitude + NEARBY_MEASURE;
        if (
            latitude >= lowerboundLatitude &&
            latitude <= upperboundLatitude &&
            longitude >= lowerboundLongitude &&
            longitude <= upperboundLongitude
        ) {
            const cabInformation = {
                cabId: cab[0],
                cabCurrentLatitude: currentLocation.latitude,
                cabCurrentLongitude: currentLocation.longitude
            };
            nearbyCabs.push(cabInformation);
        }
    }
    return nearbyCabs;
};
export const updateLocation = async (cabId, cabLocation) => {
    const cabExist = await findById(cabId);
    if (cabExist !== null) {
        locationMap.set(cabId, cabLocation);
        return true;
    } else {
        throw Error('Invalid CabId!!!');
    }
};
export const removeLocation = (cabId) => {
    if (locationMap.has(cabId)) {
        locationMap.delete(cabId);
    }
    return true;
};
