import { defineType, type SanityDocument, type Image } from 'sanity';
import { LibraryIcon } from 'lucide-react';

export const Comic = defineType({
  name: 'comic',
  title: 'Comic',
  type: 'object',
  icon: LibraryIcon,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required()
    },
    {
      name: 'author',
      title: 'Author',
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
      description: 'Link to comic.',
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

export type Comic = SanityDocument & {
  _type: (typeof Comic)['name'];
  name: string;
  author: string;
  image: Image;
  link?: string;
};
