// Migración para agregar 'attachmentId' a la tabla "Posts"
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Posts', // nombre de la tabla
      'attachmentId', // nombre de la columna
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Attachments', // nombre de la tabla referenciada
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    );
  },

  down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Posts', 'attachmentId');
  }
};