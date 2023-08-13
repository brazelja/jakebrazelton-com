import { defineType, type SanityDocument, type Image } from 'sanity';
import { ClapperboardIcon } from 'lucide-react';

export const Movie = defineType({
  name: 'movie',
  title: 'Movie',
  type: 'object',
  icon: ClapperboardIcon,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required()
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'link',
      title: 'Link',
      description: 'Link to movie.',
      type: 'url'
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image'
    }
  }
});

export type Movie = SanityDocument & {
  _type: (typeof Movie)['name'];
  name: string;
  image: Image;
  link?: string;
};
