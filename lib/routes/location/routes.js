import Joi from '@hapi/joi';
import {
    findCabs,
    removeLocation,
    updateLocation
} from '../../controllers/location.controller';
import {
    badImplementation,
    badRequest
} from '../../../utils/responseInterceptors';
const routes = [
    {
        method: 'GET',
        path: '/{latitude}/{longitude}',
        handler: (request, h) => {
            const latitude = request.params.latitude;
            const longitude = request.params.longitude;
            return findCabs(latitude, longitude);
        },
        options: {
            description: 'Get Cabs by latitude and longitude',
            tags: ['api'],
            validate: {
                params: Joi.object({
                    latitude: Joi.number().min(-90).max(90).required(),
                    longitude: Joi.number().min(-180).max(180).required()
                })
            }
        }
    },
    {
        method: 'POST',
        path: '/{cabId}',
        handler: async (request, h) => {
            const cabId = request.params.cabId;
            const payload = request.payload;
            return updateLocation(cabId, payload)
                .then((data) => {
                    return {
                        status: 200,
                        result: !!data
                    };
                })
                .catch((err) => {
                    return badRequest(err.message);
                });
        },
        options: {
            description: 'Cab Current Location Registration',
            notes: 'Upsert to the Location Map',
            tags: ['api'],
            validate: {
                params: Joi.object({
                    cabId: Joi.number().integer().min(1).max(100000)
                }),
                payload: Joi.object({
                    latitude: Joi.number().min(-90).max(90).required(),
                    longitude: Joi.number().min(-180).max(180).required()
                })
            }
        }
    },
    {
        method: 'DELETE',
        path: '/{cabId}',
        handler: async (request, h) => {
            const cabId = request.params.cabId;
            if (removeLocation(cabId)) {
                return {
                    status: 200,
                    result: 'Cab Location Deleted successfully!'
                };
            } else {
                badImplementation('Something wrong');
            }
        },
        options: {
            description: 'Cab Location Delete, when driver goes offline',
            notes: 'Delete cab location by Id',
            tags: ['api'],
            validate: {
                params: Joi.object({
                    cabId: Joi.number().integer().min(1).max(100000)
                })
            }
        }
    }
];
module.exports = routes;
