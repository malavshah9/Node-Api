import db from '../models';
const bookings = db.bookings;
export const create = async (booking) => {
    let createdBooking = await bookings.create(booking);
    return createdBooking.dataValues;
};
export const updateBookingById = async (id, booking) => {
    const updatedBooking = await bookings.update(booking, {
        where: { id: id }
    });
    return updatedBooking;
};
export const findAll = async () => {
    const allBookings = await bookings.findAll();
    return allBookings;
};
export const findByUserId = async (id) => {
    const query = {
        where: { userId: id }
    };
    const allBookings = await bookings.findAll(query);
    return allBookings;
};
export const deleteById = async (id) => {
    const count = await bookings.destroy({
        where: { id: id }
    });
    if (count === 1) {
        return { count: count, result: !!count };
    } else {
        throw new Error('Booking Not Found');
    }
};
export const updateById = async () => {};
