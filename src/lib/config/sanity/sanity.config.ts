import { defineConfig } from 'sanity';
import { ResumePreview } from './components/ResumePreview';
import app from '../app';

import { visionTool } from '@sanity/vision';
import { deskTool } from 'sanity/desk';

import {
  // documents
  Certification,
  Company,
  Education,
  Experience,
  Interests,
  Project,
  School,
  Skills,
  User,
  // objects
  Address,
  Book,
  Comic,
  Language,
  Movie,
  Skill,
  VideoGame
} from '$lib/config/sanity/schemas';

const singletonTypes = new Set<string>([User.name, Skills.name, Interests.name]);
const singletonActions = new Set(['publish', 'discardChanges', 'restore']);

export default defineConfig({
  basePath: '/studio',
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  title: app.appName + ' - Studio',
  schema: {
    types: [
      // documents
      Certification,
      Company,
      Education,
      Experience,
      Interests,
      Project,
      School,
      Skills,
      User,
      // objects
      Address,
      Book,
      Comic,
      Language,
      Movie,
      Skill,
      VideoGame
    ],
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType))
  },
  plugins: [
    deskTool({
      defaultDocumentNode: (S, { schemaType }) => {
        if (
          ([User.name, Experience.name, Education.name, Project.name] as string[]).includes(
            schemaType
          )
        ) {
          return S.document().views([
            S.view.form(),
            S.view.component(ResumePreview).title('Preview')
          ]);
        }

        return null;
      },
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            ...S.documentTypeListItems().map((listItem) => {
              if (listItem.getId() === User.name) {
                return S.listItem()
                  .title('User')
                  .id('user')
                  .icon(User.icon)
                  .child(
                    S.document()
                      .schemaType('user')
                      .documentId('user')
                      .views([S.view.form(), S.view.component(ResumePreview).title('Preview')])
                  );
              }
              if (listItem.getId() === Skills.name) {
                return S.listItem()
                  .title('Skills')
                  .id('skills')
                  .icon(Skills.icon)
                  .child(
                    S.document()
                      .schemaType('skills')
                      .documentId('skills')
                      .views([S.view.form(), S.view.component(ResumePreview).title('Preview')])
                  );
              }
              if (listItem.getId() === Interests.name) {
                return S.listItem()
                  .title('Interests')
                  .id('interests')
                  .icon(Interests.icon)
                  .child(
                    S.document()
                      .schemaType('interests')
                      .documentId('interests')
                      .views([S.view.form(), S.view.component(ResumePreview).title('Preview')])
                  );
              }
              return listItem;
            })
          ])
    }),
    visionTool()
  ],
  document: {
    productionUrl: async (prev) => {
      const url = new URL('/api/preview', location.origin);
      const secret = import.meta.env.VITE_SANITY_PREVIEW_SECRET;
      if (secret) url.searchParams.set('secret', secret);
      return prev;
    },
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input
  }
});
