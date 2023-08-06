import { defineType, type SanityDocument } from 'sanity';
import { CheckIcon } from 'lucide-react';

const SKILL_TYPES = [
  { title: 'Language', value: 'language' },
  { title: 'Framework', value: 'framework' },
  { title: 'Library', value: 'library' },
  { title: 'Database', value: 'database' },
  { title: 'GraphQL', value: 'graphql' },
  { title: 'Design System', value: 'designSystem' },
  { title: 'Communication Protocol', value: 'communicationProtocol' },
  { title: 'Software', value: 'software' },
  { title: 'Operating System', value: 'operatingSystem' },
  { title: 'Markup Language', value: 'markupLanguage' },
  { title: 'Style Sheet Language', value: 'styleSheetLanguage' },
  { title: 'Query Language', value: 'queryLanguage' },
  { title: 'Version Control System', value: 'versionControlSystem' },
  { title: 'Cloud', value: 'cloud' },
  { title: 'Containerization', value: 'containerization' },
  { title: 'Automation', value: 'automation' },

  { title: 'Other', value: 'other' }
];

export const Skill = defineType({
  name: 'skill',
  title: 'Skill',
  type: 'document',
  icon: CheckIcon,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required()
    },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: SKILL_TYPES
      },
      validation: (rule) => rule.required()
    },
    {
      name: 'link',
      title: 'Link',
      description: 'Link to Skill.',
      type: 'url'
    }
  ],
  preview: {
    select: {
      name: 'name',
      type: 'type'
    },
    prepare({ name, type }) {
      return {
        title: name,
        subtitle: SKILL_TYPES.find((skillType) => skillType.value === type)?.title
      };
    }
  }
});

export type Skill = SanityDocument & {
  _type: (typeof Skill)['name'];
  name: string;
  type:
    | 'language'
    | 'framework'
    | 'library'
    | 'database'
    | 'graphql'
    | 'designSystem'
    | 'communicationProtocol'
    | 'software'
    | 'operatingSystem'
    | 'markupLanguage'
    | 'styleSheetLanguage'
    | 'queryLanguage'
    | 'versionControlSystem'
    | 'cloud'
    | 'containerization'
    | 'automation'
    | 'other';
  link?: string;
};
