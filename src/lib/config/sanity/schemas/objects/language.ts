import { defineType, type TypedObject } from 'sanity';
import { LanguagesIcon } from 'lucide-react';

export const LANGUAGES = [
  'English',
  'Spanish',
  'French',
  'German',
  'Italian',
  'Portuguese',
  'Russian',
  'Chinese',
  'Japanese',
  'Korean',
  'Arabic',
  'Hindi'
];

export const Language = defineType({
  name: 'language',
  title: 'Language',
  type: 'object',
  icon: LanguagesIcon,
  fields: [
    {
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: LANGUAGES,
        layout: 'dropdown'
      },
      validation: (Rule) => Rule.required()
    },
    {
      name: 'native',
      title: 'Native',
      type: 'boolean',
      initialValue: false,
      options: {
        layout: 'checkbox'
      }
    }
  ],
  preview: {
    select: {
      language: 'language',
      native: 'native'
    },
    prepare({ language, native }) {
      return {
        title: language,
        subtitle: native ? 'Native' : ''
      };
    }
  }
});

export type Language = TypedObject & {
  _type: (typeof Language)['name'];
  language:
    | 'English'
    | 'Spanish'
    | 'French'
    | 'German'
    | 'Italian'
    | 'Portuguese'
    | 'Russian'
    | 'Chinese'
    | 'Japanese'
    | 'Korean'
    | 'Arabic'
    | 'Hindi';
  native: boolean;
};
