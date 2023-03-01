const { DataTypes, Model } = require("sequelize");
const { use } = require("../routes/routes");

class User extends Model {
    static async find_by_username(username) {
        return await User.findOne({ where: { username } });
    }

    static async username_exists(username) {
        try {
            let task = await User.findOne({ where: { username } });
            console.log(JSON.stringify(task))
            if (task) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    }
}

async function init_user_table(sequelize) {
    User.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, { sequelize, tableName: "users", freezeTableName: true });
    await User.sync();
    console.log("Initialized 'users' table. ✅")
}

module.exports = { User, init_user_table }
