import bcrypt from 'bcrypt';
module.exports = (sequelize, Sequelize, DataTypes) => {
    return sequelize.define(
        'users',
        {
            id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            firstName: {
                field: 'first_name',
                type: DataTypes.STRING(32),
                allowNull: false
            },
            lastName: {
                field: 'last_name',
                type: DataTypes.STRING(32),
                allowNull: false
            },
            email: {
                type: DataTypes.STRING(32),
                allowNull: false,
                validate: {
                    isEmail: true
                },
                unique: {
                    args: true,
                    msg: 'Email address already in use!'
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            tableName: 'users',
            timestamps: true,
            hooks: {
                beforeCreate: async (user) => {
                    let hashedPassword = await bcrypt.hash(user.password, 10);
                    user.password = hashedPassword;
                }
            }
        }
    );
};
