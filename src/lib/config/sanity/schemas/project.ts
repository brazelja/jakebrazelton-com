import { defineType, type SanityDocument, type PortableTextBlock, type Reference } from 'sanity';
import { CodeIcon } from 'lucide-react';

import type { Company } from './company';
import type { Skill } from './objects';

export const Project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: CodeIcon,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required()
    },
    {
      name: 'company',
      title: 'Company',
      type: 'reference',
      to: [{ type: 'company' }]
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'link',
      title: 'Link',
      type: 'url'
    },
    {
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      validation: (rule) => rule.required()
    },
    {
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [
        {
          type: 'skill'
        }
      ]
    }
  ]
});

export type Project = SanityDocument & {
  _type: (typeof Project)['name'];
  name: string;
  company: Reference & { _def: Company };
  description: PortableTextBlock[];
  link?: string;
  skills: Skill[];
};
