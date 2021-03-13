const db = require("../models");
const task = db.task;
const responseMessage = require('../consts/responseMessages.json');
const { validationResult } = require('express-validator/check');

// Create and save a new Task
exports.createTask = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const taskInfo = {
    title: req.body.title,
    completed:req.body.completed

  }
  return task.create({
    title: taskInfo.title,
    completed: taskInfo.completed,
  })
    .then((result) => {
      res.send(result);
      console.log(`>> Created task: ${JSON.stringify(result, null, 4)}`);
      return result;
    })
    .catch((err) => {
      res.send(responseMessage["response.error"]);
      console.log(`>> Error while creating task:  ${err}`);
    });
};


// Get the subtasks for a given task
exports.findTaskById = (req, res) => {
  const taskId = req.params.taskId;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  return task.findByPk(taskId)
    .then((result) => {
      res.send(result);
      console.log(`>> Task with Id: ${taskId} is ${JSON.stringify(result, null, 4)}`);

    })
    .catch((err) => {
      res.send(responseMessage["response.error"]);
      console.log(`>> Error while finding Task:  ${err}`);
    });
};

// Update the task for a given taskId
exports.updateTaskStatus = (req, res) => {

  const taskInfo = {
    title: req.body.title,
    task_status: req.body.completed,

  }
  const taskId = req.params.taskId;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  return task.update(taskInfo, {
    where: { id: taskId }
  })
    .then(num => {
      if (num == 1) {
        res.send(responseMessage["response.task.updated"]);
        console.log(`>> Task with Id: ${taskId} updated status to ${taskInfo.taskStatus}`);
      } else {
        res.status(500).send(responseMessage["response.task.updatefail"]);
        console.log(`>> Cannot update task with Id: ${taskId} and status ${taskInfo.taskStatus}`);
      }
    })
    .catch((err) => {
      res.send(responseMessage["response.error"]);
      console.log(`>> Error while updating task:  ${err}`);
    });
};

// Get all tasks include subtask
exports.findAll = (req, res) => {
  return task.findAll().then((results) => {
    res.send(results);
    console.log(`>> All Tasks${JSON.stringify(results, null, 4)}`);

  }).catch((err) => {
    res.send(responseMessage["response.error"]);
    console.log(`>> Error while findAll subtask:  ${err}`);
  });
};

exports.deleteTask = (req,res) =>{
  const taskId = req.params.taskId;
  return task.destroy({
    where: { id: taskId }
  }).then(num => {
    if (num == 1) {
      res.send(responseMessage["response.task.deleted"]);
      console.log(`>> Task with Id: ${taskId} deleted`);
    } else {
      res.status(500).send(responseMessage["response.task.deletefail"]);
      console.log(`>> Cannot delete task with Id: ${taskId} and status`);
    }
  }).catch((err) => {
    res.send(responseMessage["response.error"]);
    console.log(`>> Error while deleting task:  ${err}`);
  });

}

exports.completeAllTasks = (req,res) =>{
  return task.update({completed:true}, {
    where: { completed: false }
  }).then(num => {
        res.send(responseMessage["response.task.updated"]);
    })
    .catch((err) => {
      res.send(responseMessage["response.error"]);
      console.log(`>> Error while updating task:  ${err}`);
    });

}

exports.deleteAllCompleted = (req,res) =>{
  return task.destroy({
    where: { completed: true }
  }).then(num => {
      res.send(responseMessage["response.task.deleted"]);
  }).catch((err) => {
    res.send(responseMessage["response.error"]);
  });

}
