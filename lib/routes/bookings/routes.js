import {
    create,
    findAll,
    findByUserId,
    updateById,
    deleteById
} from '../../controllers/bookings.controller';
import {
    badImplementation,
    notFound,
    badRequest,
    unauthorized
} from '../../../utils/responseInterceptors';
const routes = [
    {
        method: 'GET',
        path: '/',
        handler: async (request, h) => {
            return findAll()
                .then((data) => {
                    return h.response(data);
                })
                .catch((err) => {
                    notFound(err.message);
                });
        },
        options: {
            description: 'Get All Bookings',
            notes: 'Select all Booking Table',
            tags: ['api']
        }
    },
    {
        method: 'GET',
        path: '/{userId}',
        handler: async (request, h) => {
            const userId = request.params.userId;
            return findByUserId(userId)
                .then((data) => {
                    return h.response(data);
                })
                .catch((err) => {
                    notFound(err.message);
                });
        },
        options: {
            description: 'Get booking by Id',
            notes: 'Select booking by Id',
            tags: ['api']
        }
    },
    {
        method: 'POST',
        path: '/',
        handler: async (request, h) => {
            const payload = request.payload;
            return create(payload)
                .then((data) => {
                    return h.response(data);
                })
                .catch((err) => {
                    return badImplementation(err.message);
                });
        },
        options: {
            description: 'User Booking',
            notes: 'Insert to the Booking table',
            tags: ['api']
        }
    },
    {
        method: 'PUT',
        path: '/{userId}',
        handler: async (request, h) => {
            const userId = request.params.userId;
            const updatedDetails = request.payload;
            return updateById(userId, updatedDetails)
                .then((data) => {
                    return h.response(data);
                })
                .catch((err) => {
                    return badImplementation(err.message);
                });
        },
        options: {
            description: 'Booking Update',
            notes: 'Updates the Booking by id',
            tags: ['api']
        }
    },
    {
        method: 'DELETE',
        path: '/{userId}',
        handler: async (request, h) => {
            const userId = request.params.userId;
            return deleteById(userId)
                .then((data) => {
                    return h.response(data);
                })
                .catch((err) => {
                    console.log(err);
                    return notFound(err.message);
                });
        },
        options: {
            description: 'Booking Delete',
            notes: 'Delete Booking by id',
            tags: ['api']
        }
    }
];
module.exports = routes;
