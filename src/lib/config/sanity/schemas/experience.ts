import { defineType, type SanityDocument, type Reference, type PortableTextBlock } from 'sanity';
import { BriefcaseIcon } from 'lucide-react';

import type { Company } from './company';
import type { Skill } from './objects';

export const Experience = defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  icon: BriefcaseIcon,
  fields: [
    {
      name: 'title',
      description: 'Job title.',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required()
    },
    {
      name: 'company',
      title: 'Company',
      type: 'reference',
      to: [{ type: 'company' }],
      validation: (rule) => rule.required()
    },
    {
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      validation: (rule) => rule.required()
    },
    {
      name: 'endDate',
      title: 'End Date',
      description: 'Leave blank if current job.',
      type: 'date'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'remote',
      title: 'Remote',
      description: 'Is this a remote job?',
      type: 'boolean',
      initialValue: false,
      options: {
        layout: 'checkbox'
      }
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
  ],
  preview: {
    select: {
      title: 'title',
      media: 'company.logo'
    }
  }
});

export type Experience = SanityDocument & {
  _type: (typeof Experience)['name'];
  title: string;
  company: Reference & { _def: Company };
  startDate: `${number}-${number}-${number}`;
  endDate?: `${number}-${number}-${number}`;
  description?: PortableTextBlock[];
  remote: boolean;
  skills: Skill[];
};
