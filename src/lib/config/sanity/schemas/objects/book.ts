import { defineType, type SanityDocument, type Image } from 'sanity';
import { BookIcon } from 'lucide-react';

export const Book = defineType({
  name: 'book',
  title: 'Book',
  type: 'object',
  icon: BookIcon,
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
      description: 'Link to book.',
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

export type Book = SanityDocument & {
  _type: (typeof Book)['name'];
  name: string;
  author: string;
  image: Image;
  link?: string;
};
