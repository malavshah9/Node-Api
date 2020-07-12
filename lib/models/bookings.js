module.exports = (sequelize, Sequelize, DataTypes) => {
    return sequelize.define(
        'bookings',
        {
            id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            bookingDate: {
                field: 'booking_date',
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
            },
            fromLatitude: {
                field: 'from_latitude',
                type: DataTypes.STRING(32),
                allowNull: false
            },
            fromLongitude: {
                field: 'to_longitude',
                type: DataTypes.STRING(32),
                allowNull: false
            },
            toLatitude: {
                field: 'to_latitude',
                type: DataTypes.STRING(32),
                allowNull: false
            },
            toLongitude: {
                field: 'to_longitude',
                type: DataTypes.STRING(32),
                allowNull: false
            },
            status: {
                field: 'booking_status',
                type: DataTypes.ENUM({
                    values: ['OPEN', 'COMPLETED', 'CANCELED']
                }),
                allowNull: false,
                defaultValue: 'OPEN'
            }
        },
        {
            tableName: 'bookings',
            timestamps: true
        }
    );
};
