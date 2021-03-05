module.exports = app => {
  const task = require("../controllers/task.controller.js");
  const requestValidator =require('../helpers/requestValidator');


  var router = require("express").Router();

  // Create a new task
  router.post("/createTask",requestValidator.validate('createTask'),task.createTask);


  // Retrieve a find a task by Id
  router.get("/findTaskById/taskId/:taskId", requestValidator.validate('findTaskById'),task.findTaskById);

  // Update a status for a task
  router.put("/updateTaskStatus/taskId/:taskId", requestValidator.validate('updateTaskStatus') ,task.updateTaskStatus);

  // Get all tasks
  router.get("/findAllTasks", task.findAll);

  //Delete a task
  router.delete("/deleteTaskById/taskId/:taskId",requestValidator.validate('deleteTask'),task.deleteTask )

  app.use("/api", router);
};
