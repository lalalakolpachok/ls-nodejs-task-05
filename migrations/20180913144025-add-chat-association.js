module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Permissions', // name of Target model
      'chatId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Chats', // name of Source model
          key: 'id' // key in Source model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Permissions', // name of Target model
      'chatId' // key we want to remove
    );
  }
};
