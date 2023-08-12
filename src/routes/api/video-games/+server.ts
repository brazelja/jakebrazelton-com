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
    image: '/images/video-games/god-of-war-ragnarok.webp',
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
    image: '/images/video-games/horizon-forbidden-west.webp',
    url: 'https://www.playstation.com/en-us/games/horizon-forbidden-west/'
  },
  {
    name: 'Pyre',
    image: '/images/video-games/pyre.webp',
    url: 'https://www.supergiantgames.com/games/pyre/'
  },
  {
    name: 'Hades',
    image: '/images/video-games/hades.webp',
    url: 'https://www.supergiantgames.com/games/hades/'
  },
  {
    name: 'A Plague Tale: Innocence',
    image: '/images/video-games/a-plague-tale-innocence.avif',
    url: 'https://www.focus-entmt.com/en/games/a-plague-tale-innocence'
  },
  {
    name: 'It Takes Two',
    image: '/images/video-games/it-takes-two.webp',
    url: 'https://www.hazelight.se/games/it-takes-two/'
  },
  {
    name: 'Smite',
    image: '/images/video-games/smite.webp',
    url: 'https://www.smitegame.com/'
  }
];

export const GET: RequestHandler = async () => {
  return json(VIDEO_GAMES);
};
