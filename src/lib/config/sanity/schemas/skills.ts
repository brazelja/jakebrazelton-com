import { defineType, type SanityDocument } from 'sanity';
import { CheckIcon } from 'lucide-react';
import type { Skill } from './objects/skill';

export const Skills = defineType({
  name: 'skills',
  title: 'Skills',
  type: 'document',
  icon: CheckIcon,
  fields: [
    {
      name: 'qualifications',
      title: 'Qualifications',
      type: 'array',
      of: [{ type: 'skill' }]
    },
    {
      name: 'languages',
      title: 'Languages',
      type: 'array',
      of: [{ type: 'skill' }]
    },
    {
      name: 'frontendFrameworks',
      title: 'Frontend Frameworks',
      type: 'array',
      of: [{ type: 'skill' }]
    },
    {
      name: 'backendFrameworks',
      title: 'Backend Frameworks',
      type: 'array',
      of: [{ type: 'skill' }]
    },
    {
      name: 'graphql',
      title: 'GraphQL',
      type: 'array',
      of: [{ type: 'skill' }]
    },
    {
      name: 'stateManagement',
      title: 'State Management',
      type: 'array',
      of: [{ type: 'skill' }]
    },
    {
      name: 'databases',
      title: 'Databases',
      type: 'array',
      of: [{ type: 'skill' }]
    },
    {
      name: 'versionControlSystems',
      title: 'Version Control Systems',
      type: 'array',
      of: [{ type: 'skill' }]
    },
    {
      name: 'automation',
      title: 'Automation',
      type: 'array',
      of: [{ type: 'skill' }]
    },
    {
      name: 'cloud',
      title: 'Cloud Platforms',
      type: 'array',
      of: [{ type: 'skill' }]
    },
    {
      name: 'containerization',
      title: 'Containerization',
      type: 'array',
      of: [{ type: 'skill' }]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Skills'
      };
    }
  }
});

export type Skills = SanityDocument & {
  _type: (typeof Skills)['name'];
  qualifications: Array<Skill>;
  languages: Array<Skill>;
  frontendFrameworks: Array<Skill>;
  backendFrameworks: Array<Skill>;
  graphql: Array<Skill>;
  stateManagement: Array<Skill>;
  databases: Array<Skill>;
  versionControlSystems: Array<Skill>;
  automation: Array<Skill>;
  cloud: Array<Skill>;
  containerization: Array<Skill>;
};
