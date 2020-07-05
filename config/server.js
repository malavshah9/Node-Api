import pkg from '../package';
import semver from 'semver';
const __version=semver.valid(pkg.version)
export default {
    app: {
        name: pkg.name,
        docs: pkg.homepage,
        version: pkg.version,
        semver: {
            major: __version.major,
            minor: __version.minor,
            patch: __version.patch
        },
        env: `${
            process.env.NODE_ENV === 'production' ? 'production' : 'development'
        }`
    },
    host: '0.0.0.0',
    port: process.env.PORT || 4500,
    router: {
        isCaseSensitive: false,
        stripTrailingSlash: true
    },
};

