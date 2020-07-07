import users from '../models/users';

export const findOneUser = (userId) => {
    users.findOne({
        attributes: ['id', 'first_name', 'last_name', 'email'],
        where: {
            id: userId
        }
        // underscoredAll: false
    });
};

export const findAllUser = async (page, limit) => {
    const where = {};
    const totalCount = await users.count({ where });
    const allUsers = await users.findAll({
        attributes: ['id', 'first_name', 'last_name', 'email'],
        where,
        offset: (page - 1) * limit,
        limit
    });
    return { allUsers, totalCount };
};

export const insertUser = async (user) => {
    return users
        .create(user)
        .then((data) => {
            return data;
        })
        .catch((err) => {
            console.error('error inside insertUser ', err);
        });
};
