import JWT from 'jsonwebtoken';
import secret from '../config/secret';

export const createToken = async (email) => {
    return new Promise((resolve, reject) => {
        JWT.sign(
            { email: email },
            secret,
            {
                algorithm: 'HS256',
                expiresIn: '1h'
            },
            (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            }
        );
    });
};
export const validate = async (decoded, request, h) => {
    if (decoded && decoded.email) {
        return {
            isValid: true
        };
    } else {
        return {
            isValid: false
        };
    }
};
