import { findAllUser } from '../../dto/userDto';
const routes = [
    {
        method: 'GET',
        path: '/',
        handler() {
            return 'foo';
        },
        options: {
            tags: ['api']
        }
    },
    {
        method: 'GET',
        path: '/42',
        handler() {
            return '42';
        },
        options: {
            tags: ['api']
        }
    },
    {
        method: 'POST',
        path: '/',
        async handler(request, h) {
            console.log('request ', request);
            console.log('h ', h);
        },
        options: {
            tags: ['api']
        }
    }
];
module.exports = routes;
