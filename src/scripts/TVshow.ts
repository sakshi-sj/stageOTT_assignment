// tvShowSeed.ts
import TVShow from '../models/TVshow';
import { faker } from '@faker-js/faker';
import { connectMongo } from '../db'


const seedTVShows = async () => {
  await connectMongo();
  try {
    const tvShowsData = Array.from({ length: 20 }, () => ({
      id: faker.string.uuid(),
      title: faker.lorem.word(),
      description: faker.lorem.paragraph(),
      genres: [faker.lorem.word(), faker.lorem.word()],
      episodes: Array.from({ length: 5 }, () => ({
        episodeNumber: faker.number.int(),
        seasonNumber: faker.number.int(),
        releaseDate: faker.date.past(),
        director: faker.person.fullName(),
        actors: [faker.person.fullName(), faker.person.fullName()],
      })),
    }));

    await TVShow.insertMany(tvShowsData);
    console.log('TV Show data seeded successfully');
  } catch (error) {
    console.error('Error seeding TV show data:', error);
  }
};

seedTVShows();
