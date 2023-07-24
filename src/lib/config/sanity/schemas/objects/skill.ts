import { defineType } from 'sanity';
import { CheckIcon } from 'lucide-react';

export const SKILLS = [
  // Languages
  'JavaScript',
  'TypeScript',
  'TypeScript, JavaScript',
  'HTML',
  'CSS',
  'HTML, CSS',
  'TypeScript, HTML, CSS',
  'Python',
  'Java',
  'C#',
  'SQL',
  'Scripting',
  // Frameworks
  'React',
  'Next.js',
  'React, Next.js',
  'Svelte',
  'SvelteKit',
  'Svelte, SvelteKit',
  'Angular',
  'Flask',
  'Python, Flask',
  'Node.js',
  'Express',
  'NestJS',
  'Node.js, Nestjs',
  // Style Libraries
  'SCSS',
  'Tailwind CSS',
  'Material UI',
  'Shadcn UI',
  // Databases
  'Database Management',
  'MongoDB',
  'PostgreSQL',
  'Redis',
  'Pub/Sub',
  'Redis, Pub/Sub',
  // Tools
  'GraphQL',
  'Apollo',
  'Urql',
  'gRPC',
  'Unity',
  // Cloud
  'AWS',
  'Docker',
  'Podman',
  'Microservices',
  'Hashicorp Terraform',
  'Ansible',
  'Kubernetes',
  'Vercel',
  // OS
  'Linux',
  'Ubuntu',
  'Manjaro',
  'Windows',
  // Other
  'Git',
  'GitHub',
  'GitLab',
  'GitHub/GitLab',
  'DevOps',
  'CI/CD',
  'DevOps, CI/CD',
  'Automation',
  'Network Management',
  // Qualities
  'Teamwork',
  'Communication',
  'Problem Solving',
  'Critical Thinking',
  'Leadership',
  'Time Management',
  'Organization'
];

export const Skill = defineType({
  name: 'skill',
  title: 'Skill',
  type: 'string',
  icon: CheckIcon,
  options: {
    list: SKILLS
  }
});

export type Skill =
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
  | 'CI/CD';
