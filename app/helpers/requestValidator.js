const { body, param } = require('express-validator/check');
const requestMessage =require('../consts/responseMessages.json');

exports.validate = (method) => {
    switch (method) {
      case 'createTask': {
       return [ 
          body('title', requestMessage['response.title.required']).exists()
         ]
        break;   
      }    
      case 'findTaskById':{
        return[
            param('taskId',requestMessage['response.taskId.required']).exists(),
            param('taskId').isNumeric()
          ]
        break;
      }
      case 'updateTaskStatus':{
        return[
            param('taskId', requestMessage['response.taskId.required']).exists(),
            body('title', requestMessage['response.title.required']).exists(),
            body('completed', requestMessage['response.completed.required']).exists(),
          ]
        break;
      }
      case 'deleteTask':{
        return[
          param('taskId',requestMessage['response.taskId.required']).exists(),
          param('taskId').isNumeric()
        ]
        break;
      }
    }
  }