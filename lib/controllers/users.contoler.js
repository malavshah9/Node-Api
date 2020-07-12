import db from '../models';
const users = db.users;
export const create = async (user) => {
    let createdUser = await users.create(user);
    return createdUser.dataValues;
};
export const updateById = async (id, user) => {
    const updatedUser = await users.update(user, { where: { id: id } });
    return updatedUser;
};
export const findAll = async () => {
    const allUsers = await users.findAll();
    return allUsers;
};
export const findById = async (id) => {
    const user = await users.findByPk(id);
    return user;
};
export const deleteById = async (id) => {
    const count = await users.destroy({
        where: { id: id }
    });
    if (count === 1) {
        return { count: count, result: !!count };
    } else {
        throw new Error('User Not Found');
    }
};
