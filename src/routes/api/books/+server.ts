import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const COMICS = [
  {
    name: 'Dune',
    author: 'Frank Herbert',
    image: '/images/books/dune.webp',
    url: 'https://www.goodreads.com/book/show/44767458-dune'
  },
  {
    name: 'A Lush and Seething Hell',
    author: 'John Hornor Jacobs',
    image: '/images/books/lush-and-seething-hell.webp',
    url: 'https://www.goodreads.com/book/show/43801611'
  },
  {
    name: 'The Things They Carried',
    author: "Tim O'Brien",
    image: '/images/books/things-they-carried.webp',
    url: 'https://www.goodreads.com/book/show/133518.The_Things_They_Carried'
  },
  {
    name: 'The Hellbound Heart',
    author: 'Clive Barker',
    image: '/images/books/hellbound-heart.webp',
    url: 'https://www.goodreads.com/book/show/52635.The_Hellbound_Heart'
  },
  {
    name: 'The Gunslinger',
    author: 'Stephen King',
    image: '/images/books/gunslinger.webp',
    url: 'https://www.goodreads.com/book/show/43615.The_Gunslinger'
  },
  {
    name: 'The Call of Cthulhu and Other Weird Stories',
    author: 'H.P. Lovecraft',
    image: '/images/books/call-of-cthulhu.webp',
    url: 'https://www.goodreads.com/book/show/160149.The_Call_of_Cthulhu_and_Other_Weird_Stories'
  },
  {
    name: 'Discrete and Computational Geometry',
    author: "Satyan L. Devadoss, Joseph O'Rourke",
    image: '/images/books/discrete-and-computational-geometry.webp',
    url: 'https://www.goodreads.com/book/show/11302275-discrete-and-computational-geometry'
  },
  {
    name: 'Lovecraft Country',
    author: 'Matt Ruff',
    image: '/images/books/lovecraft-country.webp',
    url: 'https://www.goodreads.com/book/show/25109947-lovecraft-country'
  },
  {
    name: 'The King in Yellow',
    author: 'Robert W. Chambers',
    image: '/images/books/king-in-yellow.webp',
    url: 'https://www.goodreads.com/book/show/32277642-the-king-in-yellow'
  },
  {
    name: "Lisey's Story",
    author: 'Stephen King',
    image: '/images/books/liseys-story.webp',
    url: 'https://www.goodreads.com/book/show/10566.Lisey_s_Story'
  }
];

export const GET: RequestHandler = async () => {
  return json(COMICS);
};
