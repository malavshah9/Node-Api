import {
    create,
    findAll,
    findById,
    updateById,
    deleteById
} from '../../controllers/users.contoler';
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
            description: 'Get All Users',
            notes: 'Select all user Table',
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
            description: 'Get user by Id',
            notes: 'Select user by Id',
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
            description: 'User Signup',
            notes: 'Insert to the user table',
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
            description: 'User Update',
            notes: 'Updates the user by id',
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
            description: 'User Delete',
            notes: 'Delete user by id',
            tags: ['api']
        }
    }
];
module.exports = routes;
