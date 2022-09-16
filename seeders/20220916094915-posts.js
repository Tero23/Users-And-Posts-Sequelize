// const { v4 } = require('uuid');

('use strict');

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('posts', [
      {
        id: '14641e6a-a03b-4a2e-b53d-78c463e4f5d5',
        likes: 98,
        rating: 1.2,
        image: '1663321983460.WIN_20181201_22_48_28_Pro.jpg',
        text: 'Ammois aghchige',
        userId: '43e012dc-872c-49db-ad5e-6afe16626cb4',
        status: 'Pending',
        updatedAt: new Date(),
        createdAt: new Date(),
      },
      {
        id: '4b45f2b8-9423-4ae9-82c1-57215959b06e',
        likes: 134,
        rating: 1.2,
        image: '1663321983461.WIN_20181201_22_48_28_Pro.jpg',
        text: 'Bzdig Kouires',
        userId: 'b7ed5ec4-7826-4e56-b172-edab334bce12',
        status: 'Pending',
        updatedAt: new Date(),
        createdAt: new Date(),
      },
      {
        id: '4cb134ec-2292-4e4c-86ef-be3386570e2d',
        likes: 9,
        rating: 1.2,
        image: '1663321983462.WIN_20181201_22_48_28_Pro.jpg',
        text: 'Bzdig Aghchiges',
        userId: '362810f4-90a9-4e4b-bb9b-27c8146fdecd',
        status: 'Pending',
        updatedAt: new Date(),
        createdAt: new Date(),
      },
      {
        id: '4d94604c-630a-42d6-a947-e9b442b3bb7f',
        likes: 236,
        rating: 1.2,
        image: '1663321983463.WIN_20181201_22_48_28_Pro.jpg',
        text: 'Yesem Tsolere',
        userId: 'a519b0f8-fb3e-4d28-b72f-1b945c661d76',
        status: 'Pending',
        updatedAt: new Date(),
        createdAt: new Date(),
      },
      {
        id: '77e99528-84f7-4fb1-b3d2-d7ee8194c1d8',
        likes: 173,
        rating: 1.2,
        image: '1663321983464.WIN_20181201_22_48_28_Pro.jpg',
        text: 'TsolTsol',
        userId: 'a519b0f8-fb3e-4d28-b72f-1b945c661d76',
        status: 'Pending',
        updatedAt: new Date(),
        createdAt: new Date(),
      },
      {
        id: '7b94a342-0267-4174-a3f3-c2e48050550d',
        likes: 149,
        rating: 1.2,
        image: '1663321983465.WIN_20181201_22_48_28_Pro.jpg',
        text: 'Chouloulouppoupppaaaa',
        userId: 'a519b0f8-fb3e-4d28-b72f-1b945c661d76',
        status: 'Pending',
        updatedAt: new Date(),
        createdAt: new Date(),
      },
      {
        id: 'aa58bede-46f7-42a9-a7d7-21d80c5f05fb',
        likes: 43,
        rating: 1.2,
        image: '1663321983466.WIN_20181201_22_48_28_Pro.jpg',
        text: 'Lol',
        userId: 'a519b0f8-fb3e-4d28-b72f-1b945c661d76',
        status: 'Pending',
        updatedAt: new Date(),
        createdAt: new Date(),
      },
      {
        id: 'b317b751-359d-4c6e-9c32-245137ac05d2',
        likes: 111,
        rating: 1.2,
        image: '1663321983467.WIN_20181201_22_48_28_Pro.jpg',
        text: 'Chukki',
        userId: 'a519b0f8-fb3e-4d28-b72f-1b945c661d76',
        status: 'Pending',
        updatedAt: new Date(),
        createdAt: new Date(),
      },
      {
        id: 'c2903de5-85b1-4482-bef9-12a4ce429ca1',
        likes: 75,
        rating: 1.2,
        image: '1663321983468.WIN_20181201_22_48_28_Pro.jpg',
        text: 'Anjar',
        userId: 'a519b0f8-fb3e-4d28-b72f-1b945c661d76',
        status: 'Pending',
        updatedAt: new Date(),
        createdAt: new Date(),
      },
      {
        id: 'c52ee026-428f-40aa-a5f7-41cac50a2d68',
        likes: 140,
        rating: 1.2,
        image: '1663321983469.WIN_20181201_22_48_28_Pro.jpg',
        text: 'Bekaa',
        userId: 'a519b0f8-fb3e-4d28-b72f-1b945c661d76',
        status: 'Pending',
        updatedAt: new Date(),
        createdAt: new Date(),
      },
      {
        id: 'ce675a68-8f98-4142-8093-a37443974b9b',
        likes: 303,
        rating: 1.2,
        image: '1663321983470.WIN_20181201_22_48_28_Pro.jpg',
        text: 'Beirut',
        userId: 'a519b0f8-fb3e-4d28-b72f-1b945c661d76',
        status: 'Pending',
        updatedAt: new Date(),
        createdAt: new Date(),
      },
      {
        id: 'd384ead6-b466-42ed-8813-c6f81197f4c6',
        likes: 99,
        rating: 1.2,
        image: '1663321983471.WIN_20181201_22_48_28_Pro.jpg',
        text: 'Batroun',
        userId: 'a519b0f8-fb3e-4d28-b72f-1b945c661d76',
        status: 'Pending',
        updatedAt: new Date(),
        createdAt: new Date(),
      },
      {
        id: 'e25e54af-25a4-42ec-9d31-5d68bf849ce2',
        likes: 293,
        rating: 1.2,
        image: '1663321983472.WIN_20181201_22_48_28_Pro.jpg',
        text: 'Saida',
        userId: 'a519b0f8-fb3e-4d28-b72f-1b945c661d76',
        status: 'Pending',
        updatedAt: new Date(),
        createdAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('posts', null, {});
  },
};
