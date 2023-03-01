# Daniel's Assesment

## Project Overview

You are tasked with building a simple RESTful API to manage a collection of tasks.
The API should allow users to perform CRUD operations on the task collection. The
API should be secured using JWT authentication and passwords should be
encrypted using bcrypt.

## Requirements

- The API should be built using Node.js and Express.
- Data should be stored in a MySQL database using Sequelize ORM.
- The API should use JWT authentication to secure endpoints.
- Users should be able to register for an account, and their passwords should
be encrypted using bcrypt or a similar hashing algorithm.
- Users should be able to authenticate using their email and password, and
obtain a JWT token that can be used to access protected API endpoints.
- The API should allow users to perform the following operations:
  - Create a new task
  - Retrieve a list of all tasks
  - Retrieve a single task by ID
  - Update a task by ID
  - Delete a task by ID
- The API should be well-documented, with clear instructions for running the
project and making requests to the API.

## Deliverables

- A GitHub repository containing the project source code.
- A README file with instructions on how to set up and run the project.
- A Postman collection or similar tool containing sample API requests.
- Documentation and ease of use for other developers.

## Plan

- [ ] Build Express app:
  - [ ] Create a new task.
  - [ ] Retrieve a list of all tasks.
  - [ ] Retrieve a single task by ID.
  - [ ] Update a task by ID.
  - [ ] Delete a task by ID.
- [x] Add Seqeulize and MySQL functionality.
- [ ] Add authentication using JWT.
- [ ] Use Mockaroo to populate the databases and then test using postman
