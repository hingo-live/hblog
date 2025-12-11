import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const FeaturedPosts: Block = {
  slug: 'featuredPosts',
  interfaceName: 'FeaturedPostsBlock',
  labels: {
    plural: 'Featured Posts Blocks',
    singular: 'Featured Posts Block',
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
      defaultValue: 'featured',
      options: [
        {
          label: 'Automatically (Featured Posts)',
          value: 'featured',
        },
        {
          label: 'Manual Selection',
          value: 'selection',
        },
      ],
    },
    {
      name: 'selectedPosts',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'selection',
      },
      hasMany: true,
      relationTo: 'posts',
      label: 'Select Posts',
    },
    {
      name: 'limit',
      type: 'number',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'featured',
        step: 1,
      },
      defaultValue: 5,
      label: 'Number of Posts',
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
          label: 'Hero with Side Posts',
          value: 'heroWithSide',
        },
        {
          label: 'Carousel',
          value: 'carousel',
        },
      ],
    },
  ],
}
