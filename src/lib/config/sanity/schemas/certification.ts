import { defineType, type SanityDocument } from 'sanity';
import { ScrollTextIcon } from 'lucide-react';

export const Certification = defineType({
  name: 'certification',
  title: 'Certification',
  type: 'document',
  icon: ScrollTextIcon,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required()
    },
    {
      name: 'date',
      title: 'Date',
      description: 'Date of certification.',
      type: 'date',
      validation: (rule) => rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string'
    },
    {
      name: 'link',
      title: 'Link',
      description: 'Link to certification.',
      type: 'url'
    }
  ]
});

export type Certification = SanityDocument & {
  _type: (typeof Certification)['name'];
  title: string;
  date: string;
  description?: string;
  link?: string;
};
