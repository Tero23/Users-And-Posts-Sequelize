const { v4 } = require('uuid');

('use strict');

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
      {
        id: v4(),
        username: 'Tero',
        age: 31,
        email: 'doumaniant@gmail.com',
        role: 'superAdmin',
        password:
          '$2b$08$SKv4OmZ.AfClxQDlGfzu2.xnwFN41qR1vRV.VH3I9DmcbSJ45w41i',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: v4(),
        username: 'Serly',
        age: 24,
        email: 'batouzians@gmail.com',
        role: 'admin',
        password:
          '$2b$08$SKv4OmZ.AfClxQDlGfzu2.xnwFN41qR1vRV.VH3I9DmcbSJ45w41i',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: v4(),
        username: 'Varant',
        age: 27,
        email: 'doumanianv@gmail.com',
        role: 'user',
        password:
          '$2b$08$SKv4OmZ.AfClxQDlGfzu2.xnwFN41qR1vRV.VH3I9DmcbSJ45w41i',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: v4(),
        username: 'Isgoug',
        age: 29,
        email: 'doumaniani@gmail.com',
        role: 'user',
        password:
          '$2b$08$SKv4OmZ.AfClxQDlGfzu2.xnwFN41qR1vRV.VH3I9DmcbSJ45w41i',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: v4(),
        username: 'Tsoler',
        age: 23,
        email: 'doumaniants@gmail.com',
        role: 'user',
        password:
          '$2b$08$SKv4OmZ.AfClxQDlGfzu2.xnwFN41qR1vRV.VH3I9DmcbSJ45w41i',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: v4(),
        username: 'Salpi',
        age: 50,
        email: 'doumaniantsal@gmail.com',
        role: 'user',
        password:
          '$2b$08$SKv4OmZ.AfClxQDlGfzu2.xnwFN41qR1vRV.VH3I9DmcbSJ45w41i',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: v4(),
        username: 'Saro',
        age: 25,
        email: 'doumaniansa@gmail.com',
        role: 'admin',
        password:
          '$2b$08$SKv4OmZ.AfClxQDlGfzu2.xnwFN41qR1vRV.VH3I9DmcbSJ45w41i',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: v4(),
        username: 'Raffi',
        age: 24,
        email: 'bzdigianr@gmail.com',
        role: 'admin',
        password:
          '$2b$08$SKv4OmZ.AfClxQDlGfzu2.xnwFN41qR1vRV.VH3I9DmcbSJ45w41i',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: v4(),
        username: 'Loris',
        age: 34,
        email: 'doumanianl@gmail.com',
        role: 'user',
        password:
          '$2b$08$SKv4OmZ.AfClxQDlGfzu2.xnwFN41qR1vRV.VH3I9DmcbSJ45w41i',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: v4(),
        username: 'Hrag',
        age: 32,
        email: 'doumanianh@gmail.com',
        role: 'user',
        password:
          '$2b$08$SKv4OmZ.AfClxQDlGfzu2.xnwFN41qR1vRV.VH3I9DmcbSJ45w41i',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  },
};
