module.exports = {
    development: {
        url: 'localhost',
        user: 'root',
        password: '1234',
        db: 'cabbooking_schema',
        logging: true,
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
/*
Server: sql12.freemysqlhosting.net
Name: sql12354339
Username: sql12354339
Password: pLT9N2QkUh
Port number: 3306
db: 'sql12354339'


Default:
Server: 'localhost'
user: 'root'
password: '1234'
db: 'cabbooking_schema'
*/
