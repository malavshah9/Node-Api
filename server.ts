import Hapi from '@hapi/hapi';
import wurst from 'wurst';
import path from 'path';
import serverConfig from './config/server';
import Pack from './package.json';
import inert from '@hapi/inert';
import vision from '@hapi/vision';
import hapiSwaggerUI from 'hapi-swaggered-ui';
import hapiSwaggered from 'hapi-swaggered';

const init = async () => {
    const server = Hapi.server(serverConfig);
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
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.error('error in server.js ', err);
});
init();
