const express = require("express");
const { expressjwt } = require("express-jwt");

const router = express.Router();
const handlers = require("./handlers.js")

router.use(
    expressjwt({
        secret: process.env.JWT_SECRET,
        algorithms: ["HS256"]
    }).unless({ path: ["/signup", "/login", "/healthcheck"] })
)

/** 
 * Healthcheck route
*/
router.get("/healthcheck", (req, res) => {
    res.send("Hello World!");
})

/**
 * Signs up a new user
 */
router.post("/signup", handlers.signup)

/**
 * Login route
 */
router.post("/login", handlers.login)

/**
 * Creates a new task.
*/
router.post("/task/new", handlers.add_new_task)

/**
 * Retrieves a list of all tasks.
 */
router.get("/task/all", handlers.get_all_tasks)

/**
 * Retrieves a single task by ID.
 */
router.get("/task/:task_id", handlers.get_task_by_id)

/**
 * Updates a task by it's ID.
 */
router.put("/task/:task_id", handlers.update_task_by_id)

/**
 * Delete a task by it's ID.
 */
router.delete("/task/:task_id", handlers.delete_task_by_id)


module.exports = router
