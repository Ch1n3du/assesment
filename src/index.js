const express = require("express");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const router = require("./routes/routes.js");
const { init_tasks_table } = require("./models/task.model.js");
const { initDB } = require("./utils.js");
require("dotenv").config();


// Initialize the database
initDB();

const app = express();
const PORT_NUMBER = process.env.PORT_NUMBER; //! Should be read from .env file

// for parsing application/xwww-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


app.use(morgan("dev"))  // Logging
app.use(express.json()) // Parses JSON in request bodies

app.use("", router)

app.listen(PORT_NUMBER, () => {
  console.log(`Application is listening on port ${PORT_NUMBER} 🚀`)
  // console.log(router.stack)
})


