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
      name: 'languages',
      title: 'Languages',
      type: 'array',
      of: [{ type: 'skill' }]
    },
    {
      name: 'frameworks',
      title: 'Frameworks',
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
  languages: Array<Skill>;
  frameworks: Array<Skill>;
};
