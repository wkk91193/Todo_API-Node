module.exports = (sequelize, Sequelize) => {
  const task = sequelize.define("task", {
    title: {
      type: Sequelize.STRING
    },
    completed: {
      type: Sequelize.BOOLEAN
    }
  });

  return task;
};
