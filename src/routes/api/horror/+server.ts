import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const HORROR_MOVIES = [
  {
    name: 'The Night House',
    image:
      'https://m.media-amazon.com/images/M/MV5BZmIwNjJhOGYtNDcyNi00Yjc4LThiNTktMDM2ZjFhM2YxMTljXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg',
    url: 'https://www.imdb.com/title/tt9731534/'
  },
  {
    name: 'Hereditary',
    image:
      'https://m.media-amazon.com/images/M/MV5BOTU5MDg3OGItZWQ1Ny00ZGVmLTg2YTUtMzBkYzQ1YWIwZjlhXkEyXkFqcGdeQXVyNTAzMTY4MDA@._V1_.jpg',
    url: 'https://www.imdb.com/title/tt7784604/'
  },
  {
    name: 'Us',
    image:
      'https://m.media-amazon.com/images/M/MV5BZTliNWJhM2YtNDc1MC00YTk1LWE2MGYtZmE4M2Y5ODdlNzQzXkEyXkFqcGdeQXVyMzY0MTE3NzU@._V1_.jpg',
    url: 'https://www.imdb.com/title/tt6857112/'
  },
  {
    name: 'The House That Jack Built',
    image:
      'https://m.media-amazon.com/images/M/MV5BNDQ4Y2E5ODktODI5ZS00ZGVkLTgyZTEtNWY1ZjNiZTFjOTE3XkEyXkFqcGdeQXVyODY3Nzc0OTk@._V1_.jpg',
    url: 'https://www.imdb.com/title/tt4003440/'
  },
  {
    name: 'The Strangers',
    image:
      'https://m.media-amazon.com/images/M/MV5BMTkxODAyODMwNV5BMl5BanBnXkFtZTcwNzk5Nzk2MQ@@._V1_.jpg',
    url: 'https://www.imdb.com/title/tt0482606/'
  },
  {
    name: 'The Endless',
    image:
      'https://m.media-amazon.com/images/M/MV5BNjA5OTI1MjgwMl5BMl5BanBnXkFtZTgwMDU2NzY2NDM@._V1_.jpg',
    url: 'https://www.imdb.com/title/tt3986820/'
  },
  {
    name: 'Evil Dead',
    image:
      'https://m.media-amazon.com/images/M/MV5BNmE5MzdmZjItNzI4MS00YWVhLTk4MjctODliNWE1MGJmOTkyXkEyXkFqcGdeQXVyMzQyMDgzOTU@._V1_.jpg',
    url: 'https://www.imdb.com/title/tt1288558/'
  },
  {
    name: "You're Next",
    image:
      'https://m.media-amazon.com/images/M/MV5BMTQwODAxMTE1NF5BMl5BanBnXkFtZTcwNTQ0MjY3OQ@@._V1_.jpg',
    url: 'https://www.imdb.com/title/tt1853739/'
  },
  {
    name: 'Oculus',
    image:
      'https://m.media-amazon.com/images/M/MV5BMzE1NzM4MjEyNV5BMl5BanBnXkFtZTgwMjYzMjMzMTE@._V1_.jpg',
    url: 'https://www.imdb.com/title/tt2388715/'
  },
  {
    name: 'The Thing',
    image:
      'https://m.media-amazon.com/images/M/MV5BNGViZWZmM2EtNGYzZi00ZDAyLTk3ODMtNzIyZTBjN2Y1NmM1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg',
    url: 'https://www.imdb.com/title/tt0084787/'
  }
];

export const GET: RequestHandler = async () => {
  return json(HORROR_MOVIES);
};
