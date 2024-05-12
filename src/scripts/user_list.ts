// listSeed.ts
import List from '../models/users_list';
import { faker } from '@faker-js/faker';
import { connectMongo } from '../db'

const seedLists = async () => {
  await connectMongo();
  try {
    const listsData = Array.from({ length: 30 }, () => ({
      userId: faker.string.uuid(),
      itemId: faker.string.uuid(),
    }));

    await List.insertMany(listsData);
    console.log('List data seeded successfully');
  } catch (error) {
    console.error('Error seeding list data:', error);
  }
};

seedLists();
