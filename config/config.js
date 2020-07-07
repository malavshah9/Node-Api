module.exports = {
    "development": {
        "url": "localhost",
        "user": "root",
        "password": "1234",
        "db": "cabbooking_schema",
        "logging": true,
        "options": {
            "dialect": "mysql",
            "pool": {
                "min": 0,
                "max": 5,
                "idle": 10000,
                "acquire":30000
            },
            "define": {
                "userscored": true,
                "timestamps": false
            }
        }
    }
}
