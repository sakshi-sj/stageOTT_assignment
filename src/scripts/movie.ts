import { faker } from '@faker-js/faker';
import { connectMongo } from '../db'
import Movie from '../models/movie';


const seedMovies = async () => {
  await connectMongo();

  try {
    const moviesData = Array.from({ length: 15 }, () => ({
      id: faker.string.uuid(),
      title: faker.lorem.word(),
      description: faker.lorem.paragraph(),
      genres: ['Action', 'Adventure'],
      releaseDate: faker.date.past(),
      director: faker.person.fullName(),
      actors: [faker.person.fullName(), faker.person.fullName()],
    }));

    await Movie.insertMany(moviesData);

    console.log('Movie data seeded successfully');
  } catch (error) {
    console.error('Error seeding movie data:', error);
  }
};

seedMovies();
