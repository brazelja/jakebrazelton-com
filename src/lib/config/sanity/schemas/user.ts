import { defineType, type SanityDocument, type Image, type PortableTextBlock } from 'sanity';
import { UserIcon } from 'lucide-react';

import type { Address, Language, Skill } from './objects';

export const User = defineType({
  name: 'user',
  title: 'User',
  icon: UserIcon,
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'picture',
      title: 'Picture',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: (Rule) => Rule.required()
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'email',
      title: 'Email',
      type: 'email',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'address',
      title: 'Address',
      type: 'address'
    },
    {
      name: 'links',
      title: 'Links',
      type: 'object',
      fields: [
        {
          name: 'github',
          title: 'GitHub',
          type: 'url'
        },
        {
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url'
        }
      ]
    },
    {
      name: 'languages',
      title: 'Languages',
      type: 'array',
      of: [{ type: 'language' }]
    },
    {
      name: 'interests',
      title: 'Interests',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [{ type: 'skill' }]
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'picture'
    }
  }
});

export type User = SanityDocument & {
  _type: (typeof User)['name'];
  name: string;
  picture: Image;
  title: string;
  bio: PortableTextBlock[];
  email: string;
  phone: string;
  address: Address;
  links: {
    github?: string;
    linkedin?: string;
  };
  languages: Language[];
  interests: string[];
  skills: Skill[];
};
