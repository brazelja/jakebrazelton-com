import { defineType, type SanityDocument, type PortableTextBlock, type Reference } from 'sanity';
import { CodeIcon } from 'lucide-react';
import type { Company } from './company';

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

export type Project = SanityDocument & {
  _type: (typeof Project)['name'];
  name: string;
  company: Reference & { _def: Company };
  description: PortableTextBlock[];
  link?: string;
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
