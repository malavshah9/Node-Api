import {
    create,
    findAll,
    findById,
    updateCabById,
    deleteById
} from '../../controllers/cabs.controller';
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
            description: 'Get All Cabs',
            notes: 'Select all Cabs Table',
            tags: ['api']
        }
    },
    {
        method: 'GET',
        path: '/{userId}',
        handler: async (request, h) => {
            const userId = request.params.userId;
            return findById(userId)
                .then((data) => {
                    return h.response(data);
                })
                .catch((err) => {
                    notFound(err.message);
                });
        },
        options: {
            description: 'Get Cabs by Id',
            notes: 'Select Cabs by Id',
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
            description: 'Cab Registration',
            notes: 'Insert to the Cab table',
            tags: ['api']
        }
    },
    {
        method: 'PUT',
        path: '/{userId}',
        handler: async (request, h) => {
            const userId = request.params.userId;
            const updatedDetails = request.payload;
            return updateCabById(userId, updatedDetails)
                .then((data) => {
                    return h.response(data);
                })
                .catch((err) => {
                    return badImplementation(err.message);
                });
        },
        options: {
            description: 'Cab Update',
            notes: 'Updates the Cab by id',
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
            description: 'Cab Delete',
            notes: 'Delete Cab by id',
            tags: ['api']
        }
    }
];
module.exports = routes;
