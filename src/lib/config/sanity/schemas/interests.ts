import { defineType, type SanityDocument } from 'sanity';
import { CheckIcon } from 'lucide-react';
import type { Book, VideoGame, Comic, Movie } from './objects';

export const Interests = defineType({
  name: 'interests',
  title: 'Interests',
  type: 'document',
  icon: CheckIcon,
  fields: [
    {
      name: 'books',
      title: 'Books',
      type: 'array',
      of: [{ type: 'book' }]
    },
    {
      name: 'videoGames',
      title: 'Video Games',
      type: 'array',
      of: [{ type: 'videoGame' }]
    },
    {
      name: 'comics',
      title: 'Comics',
      type: 'array',
      of: [{ type: 'comic' }]
    },
    {
      name: 'horrorMovies',
      title: 'Horror Movies',
      type: 'array',
      of: [{ type: 'movie' }]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Interests'
      };
    }
  }
});

export type Interests = SanityDocument & {
  _type: (typeof Interests)['name'];
  books: Array<Book>;
  videoGames: Array<VideoGame>;
  comics: Array<Comic>;
  horrorMovies: Array<Movie>;
};
