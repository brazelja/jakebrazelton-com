import { defineType, type SanityDocument, type Reference, type PortableTextBlock } from 'sanity';
import { BriefcaseIcon } from 'lucide-react';

import type { Company } from './company';

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
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: [
              // Languages
              'JavaScript',
              'TypeScript',
              'HTML',
              'CSS',
              'Python',
              'Java',
              'C#',
              // Frameworks
              'React',
              'Next.js',
              'Svelte',
              'SvelteKit',
              'Angular',
              'Node.js',
              'Express',
              'NestJS',
              // Style Libraries
              'SCSS',
              'Tailwind CSS',
              'Material UI',
              'Headless UI',
              // Databases
              'MongoDB',
              'PostgreSQL',
              'Redis',
              // Tools
              'GraphQL',
              'Apollo',
              // Cloud
              'AWS',
              'Docker',
              'Podman',
              'Terraform',
              'Ansible',
              'Kubernetes',
              'Microservices',
              // OS
              'Linux',
              'Ubuntu',
              'Manjaro',
              'Windows',
              // Other
              'Git',
              'GitHub',
              'GitLab',
              'DevOps',
              'CI/CD'
            ]
          }
        }
      ]
    }
  ]
});

export type Experience = SanityDocument & {
  _type: (typeof Experience)['name'];
  title: string;
  company: Reference & { _def: Company };
  startDate: string;
  endDate?: string;
  description?: PortableTextBlock[];
  skills:
    | 'JavaScript'
    | 'TypeScript'
    | 'HTML'
    | 'CSS'
    | 'Python'
    | 'Java'
    | 'C#'
    | 'React'
    | 'Next.js'
    | 'Svelte'
    | 'SvelteKit'
    | 'Angular'
    | 'Node.js'
    | 'Express'
    | 'NestJS'
    | 'SCSS'
    | 'Tailwind CSS'
    | 'Material UI'
    | 'Headless UI'
    | 'MongoDB'
    | 'PostgreSQL'
    | 'Redis'
    | 'GraphQL'
    | 'Apollo'
    | 'AWS'
    | 'Docker'
    | 'Podman'
    | 'Terraform'
    | 'Ansible'
    | 'Kubernetes'
    | 'Microservices'
    | 'Linux'
    | 'Ubuntu'
    | 'Manjaro'
    | 'Windows'
    | 'Git'
    | 'GitHub'
    | 'GitLab'
    | 'DevOps'
    | 'CI/CD'[];
};
