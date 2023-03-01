require("dotenv").config();
const bcrypt = require("bcrypt");
const { Sequelize } = require("sequelize");
const { init_tasks_table } = require("./models/task.model");
const { init_user_table } = require("./models/user.model");

const SALT_ROUNDS = 10;

/**
 * Hashes a user's password
 * @param {string} password 
 * @returns {string}
 */
function hash_password(password) {
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    const hash = bcrypt.hashSync(password, salt)
    return hash
}

/**
 * Checks a plaintext password against a hash.
 * @param {string} password 
 * @param {string} hash 
 * @returns {boolean}
 */
function check_password(password, hash) {
    return bcrypt.compareSync(password, hash)
}

/**
 * Initializes the DataBasee and returns a Sequelize handle.
 * @returns {Sequelize}
 */
async function initDB() {
    const sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST,
            dialect: "mysql",
        }
    )

    sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.');
    }).catch((error) => {
        console.error('Unable to connect to the database: ', error);
    });

    await init_tasks_table(sequelize);
    await init_user_table(sequelize);
    console.log("Done initializing Databases ✅")
    return sequelize;
}


module.exports = {
    hash_password,
    check_password,
    initDB,
}
