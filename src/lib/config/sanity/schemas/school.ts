import { defineType, type SanityDocument, type Image } from 'sanity';
import { Building2Icon } from 'lucide-react';
import type { Address } from './objects';

export const School = defineType({
  name: 'school',
  title: 'School',
  type: 'document',
  icon: Building2Icon,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required()
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required()
    },
    {
      name: 'website',
      title: 'Website',
      type: 'url',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'address',
      title: 'Address',
      type: 'address'
    }
  ]
});

export type School = SanityDocument & {
  _type: (typeof School)['name'];
  name: string;
  logo: Image;
  website: string;
  address?: Address;
};
