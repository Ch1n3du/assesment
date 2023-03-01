const jwt = require("jsonwebtoken");
require("dotenv").config();

const { User } = require("../models/user.model");
const { Task } = require("../models/task.model");
const { hash_password, check_password } = require("../utils");

async function signup(req, res) {
    const { username, password } = req.body;

    if (await User.username_exists(username)) {
        res.status(STATUS.CONFLICT).send({ msg: `Username '${username}' is already in use.` });
        return;
    } else {
        let hash = hash_password(password);
        let new_user = await User.create({ username: username, password: hash });
        console.log(`Successfully Signed Up a new user ✅`)
        res.status(STATUS.OK).send({ msg: "Success" })
    }
}

async function login(req, res) {
    const { username, password } = req.body;

    let user = await User.find_by_username(username);
    // console.log("from find_by:")
    // console.log(user)
    // let temp = JSON.stringify(user, null, 4)
    // console.log(`User: ${temp}`)

    // Check if the user exists
    if (!user) {
        res.status(STATUS.INTERNAL).send({ msg: "Username doesn't exist." });
        return;
    }

    if (!check_password(password, user.password)) {
        res.status(STATUS.UNAUTHORIZED).send({ msg: "Incorrect password" })
        return;
    }

    // Make and send the JWT
    let token = jwt.sign({ username, user_id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" })
    res.status(STATUS.OK).send({ auth: true, token: token })
}

async function add_new_task(req, res) {
    const { name, description } = req.body;
    const user_id = req.auth.user_id;

    await Task.create({ user_id, name, description });
    res.status(STATUS.OK).send({ msg: "Success" })
}

async function get_all_tasks(req, res) {
    const user_id = req.auth.user_id;
    let tasks = await Task.find_tasks_by_user_id(user_id);

    res.status(STATUS.OK).send(tasks)
}

async function get_task_by_id(req, res) {
    const { task_id } = req.body;
    let task = await Task.find_task_by_id(task_id);

    res.status(STATUS.OK).send(task);
}

async function update_task_by_id(req, res) {
    const user_id = req.auth.user_id;
    const task_id = req.params["task_id"]
    const { updated_task } = req.body;

    let task = await Task.find_task_by_id(task_id);
    if (user_id != task.user_id) {
        res.status(STATUS.UNAUTHORIZED).send({ msg: "This user is not permitted to modify this task." })
        return;
    }

    task.set(updated_task);
    await task.save();

    res.status(STATUS.OK).send({ msg: "Success" });
}

async function delete_task_by_id(req, res) {
    const user_id = req.auth.user_id;
    const task_id = req.params["task_id"]

    let task = await Task.find_task_by_id(task_id);
    if (user_id != task.user_id) {
        res.status(STATUS.UNAUTHORIZED).send({ msg: "This user is not permitted to modify this task." })
        return;
    }

    await task.destroy();
    res.status(STATUS.OK).send({ msg: "Success" });
}

const STATUS = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL: 500,
}

module.exports = {
    signup,
    login,
    add_new_task,
    get_all_tasks,
    get_task_by_id,
    update_task_by_id,
    delete_task_by_id,
}

