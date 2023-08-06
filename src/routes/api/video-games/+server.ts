import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const VIDEO_GAMES = [
  {
    name: 'Persoan 5 Royal',
    image: '/images/video-games/persona-5-royal.webp',
    url: 'https://persona.atlus.com/p5r/?lang=en'
  },
  {
    name: 'God of War Ragnarok',
    image: '/images/video-games/god-of-war-ragnarok.jpg',
    url: 'https://www.playstation.com/en-us/games/god-of-war-ragnarok/'
  },
  {
    name: 'Transistor',
    image: '/images/video-games/transistor.webp',
    url: 'https://www.supergiantgames.com/games/transistor/'
  },
  {
    name: "Marvel's Spider-Man",
    image: '/images/video-games/spider-man.avif',
    url: 'https://www.playstation.com/en-us/games/marvels-spider-man-remastered/'
  },
  {
    name: 'Horizon Forbidden West',
    image: '/images/video-games/horizon-forbidden-west.jpg',
    url: 'https://www.playstation.com/en-us/games/horizon-forbidden-west/'
  }
];

export const GET: RequestHandler = async () => {
  return json(VIDEO_GAMES);
};
