// const { v4 } = require('uuid');

('use strict');

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
      {
        id: '91b4bbcc-f294-4ee4-98df-c2b0a849b04b',
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
        id: 'cf87d9b7-51b5-40fb-b6ef-b20db6c7b548',
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
        id: 'e287c949-74a0-4ccc-8314-7a51ee90e338',
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
        id: 'b7ed5ec4-7826-4e56-b172-edab334bce12',
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
        id: 'a519b0f8-fb3e-4d28-b72f-1b945c661d76',
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
        id: '362810f4-90a9-4e4b-bb9b-27c8146fdecd',
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
        id: '99da5dfe-22db-405b-a76b-ba44ec4cffd0',
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
        id: '341b5051-e5b8-4255-ad52-d01833f02253',
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
        id: '43e012dc-872c-49db-ad5e-6afe16626cb4',
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
        id: 'fca27caf-b17a-4149-93ee-b9b43fcc2235',
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
