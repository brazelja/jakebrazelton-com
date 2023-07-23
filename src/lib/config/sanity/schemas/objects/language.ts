import { defineType, type TypedObject } from 'sanity';
import { LanguagesIcon } from 'lucide-react';

const LANGUAGES = [
  { title: 'English', value: 'english' },
  { title: 'Spanish', value: 'spanish' },
  { title: 'French', value: 'french' },
  { title: 'German', value: 'german' },
  { title: 'Italian', value: 'italian' },
  { title: 'Portuguese', value: 'portuguese' },
  { title: 'Russian', value: 'russian' },
  { title: 'Chinese', value: 'chinese' },
  { title: 'Japanese', value: 'japanese' },
  { title: 'Korean', value: 'korean' },
  { title: 'Arabic', value: 'arabic' },
  { title: 'Hindi', value: 'hindi' }
] satisfies { title: string; value: string }[];

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
        title: language && LANGUAGES.find((lang) => lang.value === language)?.title,
        subtitle: native ? 'Native' : 'Not Native'
      };
    }
  }
});

export type Language = TypedObject & {
  _type: (typeof Language)['name'];
  language:
    | 'english'
    | 'spanish'
    | 'french'
    | 'german'
    | 'italian'
    | 'portuguese'
    | 'russian'
    | 'chinese'
    | 'japanese'
    | 'korean'
    | 'arabic'
    | 'hindi';
  native: boolean;
};
