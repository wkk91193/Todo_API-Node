module.exports = (sequelize, Sequelize) => {
  const task = sequelize.define("task", {
    title: {
      type: Sequelize.STRING
    },
    task_status: {
      type: Sequelize.BOOLEAN
    }
  });

  return task;
};
