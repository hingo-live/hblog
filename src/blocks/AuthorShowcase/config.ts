import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const AuthorShowcase: Block = {
  slug: 'authorShowcase',
  interfaceName: 'AuthorShowcaseBlock',
  labels: {
    plural: 'Author Showcase Blocks',
    singular: 'Author Showcase Block',
  },
  fields: [
    {
      name: 'introContent',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Section Title/Content',
    },
    {
      name: 'populateBy',
      type: 'select',
      defaultValue: 'topAuthors',
      options: [
        {
          label: 'Top Authors (by score)',
          value: 'topAuthors',
        },
        {
          label: 'Manual Selection',
          value: 'selection',
        },
      ],
    },
    {
      name: 'selectedAuthors',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'selection',
      },
      hasMany: true,
      relationTo: 'users',
      label: 'Select Authors',
    },
    {
      name: 'limit',
      type: 'number',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'topAuthors',
        step: 1,
      },
      defaultValue: 5,
      label: 'Number of Authors',
    },
    {
      name: 'showStats',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show Author Stats',
    },
    {
      name: 'showBio',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show Author Bio',
    },
    {
      name: 'showSocialLinks',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show Social Links',
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'grid',
      options: [
        {
          label: 'Grid',
          value: 'grid',
        },
        {
          label: 'List',
          value: 'list',
        },
        {
          label: 'Carousel',
          value: 'carousel',
        },
      ],
    },
  ],
}
