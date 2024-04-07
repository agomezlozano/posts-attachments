'use strict';

const fs = require('fs');
const path = require('path');

module.exports = {
  async up (queryInterface, Sequelize) {
    // Lee la imagen como datos binarios
    const image = fs.readFileSync(path.join(__dirname, '../public/images/none.png'));

    // Añade los tres posts sin imagen adjunta
    const posts = await queryInterface.bulkInsert('Posts', [
      {
        title: 'Primer Post',
        body: 'Esta práctica implementa un Blog.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Segundo Post',
        body: 'Todo el mundo puede crear posts.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Tercer Post',
        body: 'Cada post puede tener una imagen adjunta.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true });

    // Crea un nuevo Attachment para cada Post
    for (let i = 0; i < posts.length; i++) {
      const attachment = await queryInterface.bulkInsert('Attachments', [{
        mime: 'image/png',
        url: '/images/none.png',
        image: image,
        createdAt: new Date(),
        updatedAt: new Date()
      }], { returning: true });

      await queryInterface.bulkUpdate('Posts', {
        attachmentId: attachment[0].id
      }, {
        id: posts[i].id
      });
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Posts', null, {});
    await queryInterface.bulkDelete('Attachments', null, {});
  }
};