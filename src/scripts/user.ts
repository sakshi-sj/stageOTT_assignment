// userSeed.ts
import User from '../models/user';
import { faker } from '@faker-js/faker';
import { connectMongo } from '../db'

const seedUsers = async () => {
  await connectMongo();
  try {
    const usersData = Array.from({ length: 10 }, () => ({
      id: faker.string.uuid(),
      username: faker.internet.userName(),
      preferences: {
        favoriteGenres: [faker.lorem.word(), faker.lorem.word()],
        dislikedGenres: [faker.lorem.word()],
      },
      watchHistory: [],
    }));

    await User.insertMany(usersData);
    console.log('User data seeded successfully');
  } catch (error) {
    console.error('Error seeding user data:', error);
  }
};

seedUsers();
