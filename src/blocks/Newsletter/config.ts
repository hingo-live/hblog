import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Newsletter: Block = {
  slug: 'newsletter',
  interfaceName: 'NewsletterBlock',
  labels: {
    plural: 'Newsletter Blocks',
    singular: 'Newsletter Block',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Subscribe to our Newsletter',
      label: 'Heading',
    },
    {
      name: 'description',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Description',
    },
    {
      name: 'placeholderText',
      type: 'text',
      defaultValue: 'Enter your email',
      label: 'Input Placeholder',
    },
    {
      name: 'buttonText',
      type: 'text',
      defaultValue: 'Subscribe',
      label: 'Button Text',
    },
    {
      name: 'successMessage',
      type: 'text',
      defaultValue: 'Thank you for subscribing!',
      label: 'Success Message',
    },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'default',
      options: [
        {
          label: 'Default',
          value: 'default',
        },
        {
          label: 'Primary',
          value: 'primary',
        },
        {
          label: 'Dark',
          value: 'dark',
        },
        {
          label: 'Gradient',
          value: 'gradient',
        },
      ],
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'horizontal',
      options: [
        {
          label: 'Horizontal',
          value: 'horizontal',
        },
        {
          label: 'Vertical',
          value: 'vertical',
        },
        {
          label: 'Card',
          value: 'card',
        },
      ],
    },
  ],
}
