import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const COMICS = [
  {
    name: 'The Sandman',
    image: '/images/comics/sandman.jpg',
    url: 'https://en.wikipedia.org/wiki/The_Sandman_(comic_book)'
  },
  {
    name: 'Transformers',
    image: '/images/comics/transformers.jpg',
    url: 'https://en.wikipedia.org/wiki/The_Transformers_(IDW_Publishing)'
  },
  {
    name: 'House of X/Powers of X',
    image: '/images/comics/house-of-x-powers-of-x.jpg',
    url: 'https://en.wikipedia.org/wiki/House_of_X/Powers_of_X'
  },
  {
    name: 'Lucifer',
    image: '/images/comics/lucifer.jpg',
    url: 'https://en.wikipedia.org/wiki/Lucifer_(DC_Comics)'
  },
  {
    name: 'Providence',
    image: '/images/comics/providence.jpg',
    url: 'https://en.wikipedia.org/wiki/Providence_(Avatar_Press)'
  },
  {
    name: 'Fun Home',
    image: '/images/comics/fun-home.jpg',
    url: 'https://en.wikipedia.org/wiki/Fun_Home'
  },
  {
    name: 'Invincible',
    image: '/images/comics/invincible.jpg',
    url: 'https://en.wikipedia.org/wiki/Invincible_(comics)'
  },
  {
    name: 'Hellboy',
    image: '/images/comics/hellboy.jpg',
    url: 'https://en.wikipedia.org/wiki/Hellboy'
  },
  {
    name: 'Venom',
    image: '/images/comics/venom.jpg',
    url: 'https://www.marvel.com/comics/issue/67577/venom_2018_1'
  },
  {
    name: 'Transmetropolitan',
    image: '/images/comics/transmetropolitan.jpg',
    url: 'https://en.wikipedia.org/wiki/Transmetropolitan'
  }
];

export const GET: RequestHandler = async () => {
  return json(COMICS);
};
