import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const MostViewed: Block = {
  slug: 'mostViewed',
  interfaceName: 'MostViewedBlock',
  labels: {
    plural: 'Most Viewed Blocks',
    singular: 'Most Viewed Block',
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
      name: 'sortBy',
      type: 'select',
      defaultValue: 'views',
      options: [
        {
          label: 'Views',
          value: 'views',
        },
        {
          label: 'Likes',
          value: 'likes',
        },
        {
          label: 'Comments',
          value: 'comments',
        },
      ],
    },
    {
      name: 'timeFrame',
      type: 'select',
      defaultValue: 'all',
      options: [
        {
          label: 'All Time',
          value: 'all',
        },
        {
          label: 'This Week',
          value: 'week',
        },
        {
          label: 'This Month',
          value: 'month',
        },
      ],
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 5,
      label: 'Number of Posts',
    },
    {
      name: 'showRank',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show Ranking Numbers',
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'list',
      options: [
        {
          label: 'List',
          value: 'list',
        },
        {
          label: 'Grid',
          value: 'grid',
        },
        {
          label: 'Sidebar',
          value: 'sidebar',
        },
      ],
    },
  ],
}
