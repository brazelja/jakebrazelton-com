import { defineType, type SanityDocument, type Image } from 'sanity';
import { Gamepad2Icon } from 'lucide-react';

export const VideoGame = defineType({
  name: 'videoGame',
  title: 'VideoGame',
  type: 'object',
  icon: Gamepad2Icon,
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
      description: 'Link to video game.',
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

export type VideoGame = SanityDocument & {
  _type: (typeof VideoGame)['name'];
  name: string;
  image: Image;
  link?: string;
};
