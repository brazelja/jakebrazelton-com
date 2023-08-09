import { defineType, type PortableTextBlock, type Reference, type SanityDocument } from 'sanity';
import { GraduationCapIcon } from 'lucide-react';
import type { School } from './school';

export const Education = defineType({
  name: 'education',
  title: 'Education',
  type: 'document',
  icon: GraduationCapIcon,
  fields: [
    {
      name: 'school',
      title: 'School',
      type: 'reference',
      to: [{ type: 'school' }],
      validation: (rule) => rule.required()
    },
    {
      name: 'degree',
      title: 'Degree',
      type: 'string',
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
      description: 'Leave blank if still attending.',
      type: 'date'
    },
    {
      name: 'details',
      title: 'Details',
      type: 'array',
      of: [{ type: 'block' }]
    }
  ]
});

export type Education = SanityDocument & {
  _type: (typeof Education)['name'];
  school: Reference & { _def: School };
  degree: string;
  startDate: string;
  endDate?: string;
  details?: PortableTextBlock[];
};
