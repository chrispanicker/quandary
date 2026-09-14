import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { muxInput } from 'sanity-plugin-mux-input'

export default defineConfig({
  name: 'default',
  title: 'quandary',

  projectId: 'n0zpxyat',
  dataset: 'production',

  basePath: '/admin',

  plugins: [
    muxInput(),
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Home Page Settings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings'),
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (listItem) => listItem.getId() !== 'siteSettings',
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})

