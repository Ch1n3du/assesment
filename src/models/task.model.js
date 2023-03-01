const { Sequelize, Model, DataTypes } = require("sequelize")
const User = require("./user.model")


class Task extends Model {

    /**
     * This searches for a task with the same task_id
     * @param {string} task_id 
     * @returns {Task}
     */
    static async find_task_by_id(task_id) {
        const task = await Task.findOne({ where: { id: task_id } });
        return task;
    }

    /**
     * 
     * @param {string} user_id 
     * @returns {Task}
     */
    static async find_tasks_by_user_id(user_id) {
        const task = await Task.findAll({ where: { user_id: user_id } })
        return task;
    }
}

async function init_tasks_table(sequelize) {
    Task.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            model: User,          // References another model
            key: 'id',            // Column name
            type: DataTypes.UUID,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, { sequelize, tableName: "tasks", freezeTableName: true });
    await Task.sync();
    console.log("Initialized 'tasks' table. ✅")
}

module.exports = { Task, init_tasks_table }
