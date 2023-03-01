const { Sequelize } = require("sequelize");
const { Task, initTasksTable } = require("./src/models/task.model");
const { User, initUserTable } = require("./src/models/user.model");
require("dotenv").config()

function initDB() {
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

    return sequelize;
}

(async () => {
    // await initUserTable(sequelize);
    // let ch1 = await User.create({ username: "ch1n3du", password: "12345678" })
    // await ch1.save()

    ch1_id = "7e259a41-445d-4388-bfbc-d6dc403db058"
    await init_tasks_table(sequelize);
    let t1 = await Task.create({ user_id: ch1_id, name: "task name", description: "Build cool stuff" })
    await t1.save()

    // Task.findTaskById


    // X7np-JAuPndy
    // T4sk_Man4g3r
    // User.getPasswordByUserName("ch1n3du")
})()
