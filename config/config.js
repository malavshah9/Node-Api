import env from 'dotenv';
if (process.env.ENV === 'PROD') {
    env.config({ path: 'prod.env' });
} else {
    env.config({ path: 'dev.env' });
}
export default {
    development: {
        url: process.env.URL,
        user: process.env.DB_USER,
        password: process.env.PASSWORD,
        db: process.env.DATABASE,
        logging: process.env.LOGGING,
        options: {
            dialect: 'mysql',
            pool: {
                min: 0,
                max: 5,
                idle: 10000,
                acquire: 30000
            },
            define: {
                userscored: true,
                timestamps: false
            }
        }
    }
};
