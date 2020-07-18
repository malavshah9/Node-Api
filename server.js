import Hapi from '@hapi/hapi';
import wurst from 'wurst';
import path from 'path';
import mapKeysDeep from 'map-keys-deep';
import { camelCase, snakeCase } from 'lodash';
import serverConfig from './config/server';
import Pack from './package.json';
import inert from '@hapi/inert';
import hapiAuthJWT from 'hapi-auth-jwt2';
import vision from '@hapi/vision';
import hapiSwaggerUI from 'hapi-swaggered-ui';
import hapiSwaggered from 'hapi-swaggered';
import hapiRateLimit from 'hapi-rate-limit';
import db from './lib/models';
import dbConfig from './config/config';
import { validate } from './utils/token';
const prepDatabase = async () => {
    db.sequelize
        .sync({
            force: false,
            alter: true
        })
        .then((data) => {
            console.log(' All models were synchronized successfully ');
        })
        .catch((err) => {
            console.error(' error in synchronizing models ', err);
        });
};
// const prepDatabase = async () => {
//     await db.sequelize
//         .authenticate()
//         .then(() => {
//             // eslint-disable-next-line no-console
//             console.log('Connection has been established successfully.');
//         })
//         .catch((err) => {
//             // eslint-disable-next-line no-console
//             console.error('Unable to connect to the database:', err);
//         });
// };
const init = async () => {
    const server = Hapi.server(serverConfig);
    server.register({
        plugin: hapiRateLimit,
        options: {
            enabled: true,
            userLimit: 100,
            pathLimit: 50
        }
    });
    await (async () => {
        await server.register({
            plugin: wurst,
            options: {
                routes: '**/routes.js',
                cwd: path.join(__dirname, 'lib/routes'),
                log: true
            }
        });
    })();
    // await server.register({
    //     plugin: JWT
    // });
    // server.auth.strategy('jwt', 'jwt', {
    //     key: secret,
    //     validate,
    //     verifyOptions: { ignoreExpiration: true }
    // });

    // server.auth.default('jwt');
    await server.register(hapiAuthJWT);
    server.auth.strategy('jwt', 'jwt', {
        key: process.env.JWT_SECRET, // Never Share your secret key
        validate, // validate function defined above
        algorithms: ['HS256'] // specify your secure algorithm
    });
    server.auth.default('jwt');
    await server.register([
        inert,
        vision,
        {
            plugin: hapiSwaggered,
            options: {
                info: {
                    title: 'Hapi Template',
                    description:
                        'Powered by node, hapi, joi, hapi-swaggered, hapi-swaggered-ui and swagger-ui',
                    version: '1.0'
                }
            }
        },
        {
            plugin: hapiSwaggerUI,
            swaggerOptions: {
                documentationPage: true,
                swaggerUI: true,
                auth: false,
                authorization: null,
                info: {
                    title: 'Node Hapi Template API documentation',
                    version: Pack.version
                }
            }
        }
    ]);
    const onPreHandler = function (request, h) {
        const requestQueryParams = request.query;
        const requestPayload = request.payload;
        request.query = mapKeysDeep(requestQueryParams, (keys) =>
            camelCase(keys)
        );
        request.payload = mapKeysDeep(requestPayload, (keys) =>
            camelCase(keys)
        );
        return h.continue;
    };

    const onPreResponse = function (request, h) {
        const response = request.response;
        const responseSource = response.source;
        response.source = mapKeysDeep(responseSource, (keys) =>
            snakeCase(keys)
        );
        return h.continue;
    };

    server.ext('onPreHandler', onPreHandler);
    server.ext('onPreResponse', onPreResponse);
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.error('error in server.js ', err);
});
prepDatabase().then(
    () => {
        // eslint-disable-next-line no-console
        console.log(
            `Database connection is successful.\nThe following options were applied: ${JSON.stringify(
                dbConfig.development
            )}`
        );
        // eslint-disable-next-line no-console
        console.log(`Initializing the server...`);

        return init();
    },
    (error) => {
        // eslint-disable-next-line no-console
        console.error(error, `Server startup failed...`);
    }
);
