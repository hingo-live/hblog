import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Carousel: Block = {
  slug: 'carousel',
  interfaceName: 'CarouselBlock',
  labels: {
    plural: 'Carousel Blocks',
    singular: 'Carousel Block',
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
      name: 'contentType',
      type: 'select',
      defaultValue: 'posts',
      options: [
        {
          label: 'Posts',
          value: 'posts',
        },
        {
          label: 'Media',
          value: 'media',
        },
      ],
    },
    {
      name: 'selectedPosts',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.contentType === 'posts',
      },
      hasMany: true,
      relationTo: 'posts',
      label: 'Select Posts',
    },
    {
      name: 'selectedMedia',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.contentType === 'media',
      },
      hasMany: true,
      relationTo: 'media',
      label: 'Select Media',
    },
    {
      name: 'autoPlay',
      type: 'checkbox',
      defaultValue: true,
      label: 'Auto Play',
    },
    {
      name: 'autoPlaySpeed',
      type: 'number',
      defaultValue: 5000,
      label: 'Auto Play Speed (ms)',
      admin: {
        condition: (_, siblingData) => siblingData.autoPlay,
      },
    },
    {
      name: 'showDots',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show Navigation Dots',
    },
    {
      name: 'showArrows',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show Navigation Arrows',
    },
  ],
}
