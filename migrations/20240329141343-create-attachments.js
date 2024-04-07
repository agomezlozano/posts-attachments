// Migración para la tabla "Attachments"
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.createTable('Attachments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      mime: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING,
        defaultValue: '/images/none.png'
      },
      image: { // Agrega esta línea
        type: Sequelize.BLOB('long')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down (queryInterface, Sequelize) {
    return queryInterface.dropTable('Attachments');
  }
};
