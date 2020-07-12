module.exports = (sequelize, Sequelize, DataTypes) => {
    return sequelize.define(
        'cabs',
        {
            id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            cabRegNumber: {
                field: 'registration_number',
                type: DataTypes.STRING(32),
                allowNull: false
            },
            ownerName: {
                field: 'owner_name',
                type: DataTypes.STRING(32),
                allowNull: false
            },
            driverName: {
                field: 'driver_name',
                type: DataTypes.STRING(32),
                allowNull: false
            }
        },
        {
            tableName: 'cabs',
            timestamps: true
        }
    );
};
