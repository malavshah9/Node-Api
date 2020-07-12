import db from '../models';
const cabs = db.cabs;
export const create = async (cab) => {
    let createdCab = await cabs.create(cab);
    return createdCab.dataValues;
};
export const updateCabById = async (id, cab) => {
    const updatedCab = await cabs.update(cab, {
        where: { id: id }
    });
    return updatedCab;
};
export const findAll = async () => {
    const allCab = await cabs.findAll();
    return allCab;
};
export const findById = async (id) => {
    const cab = await cabs.findByPk(id);
    return cab;
};
export const deleteById = async (id) => {
    const count = await cabs.destroy({
        where: { id: id }
    });
    if (count === 1) {
        return { count: count, result: !!count };
    } else {
        throw new Error('Booking Not Found');
    }
};
