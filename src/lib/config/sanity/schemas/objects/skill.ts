import { defineType, type SanityDocument, type Image } from 'sanity';
import { CheckIcon } from 'lucide-react';

export const Skill = defineType({
  name: 'skill',
  title: 'Skill',
  type: 'object',
  icon: CheckIcon,
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
      description: 'Link to Skill.',
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

export type Skill = SanityDocument & {
  _type: (typeof Skill)['name'];
  name: string;
  image: Image;
  link?: string;
};
