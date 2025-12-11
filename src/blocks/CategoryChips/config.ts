import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const CategoryChips: Block = {
  slug: 'categoryChips',
  interfaceName: 'CategoryChipsBlock',
  labels: {
    plural: 'Category Chips Blocks',
    singular: 'Category Chips Block',
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
      defaultValue: 'all',
      options: [
        {
          label: 'All Categories',
          value: 'all',
        },
        {
          label: 'Manual Selection',
          value: 'selection',
        },
      ],
    },
    {
      name: 'selectedCategories',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'selection',
      },
      hasMany: true,
      relationTo: 'categories',
      label: 'Select Categories',
    },
    {
      name: 'showCount',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show Post Count',
    },
    {
      name: 'limit',
      type: 'number',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'all',
        step: 1,
      },
      defaultValue: 10,
      label: 'Max Categories to Show',
    },
  ],
}
