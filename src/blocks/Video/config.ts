import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Video: Block = {
  slug: 'video',
  interfaceName: 'VideoBlock',
  labels: {
    plural: 'Video Blocks',
    singular: 'Video Block',
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
      name: 'videoSource',
      type: 'select',
      defaultValue: 'upload',
      options: [
        {
          label: 'Upload',
          value: 'upload',
        },
        {
          label: 'YouTube',
          value: 'youtube',
        },
        {
          label: 'Vimeo',
          value: 'vimeo',
        },
        {
          label: 'External URL',
          value: 'external',
        },
      ],
    },
    {
      name: 'uploadedVideo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, siblingData) => siblingData.videoSource === 'upload',
      },
      label: 'Video File',
    },
    {
      name: 'videoUrl',
      type: 'text',
      admin: {
        condition: (_, siblingData) =>
          siblingData.videoSource === 'youtube' ||
          siblingData.videoSource === 'vimeo' ||
          siblingData.videoSource === 'external',
      },
      label: 'Video URL',
    },
    {
      name: 'poster',
      type: 'upload',
      relationTo: 'media',
      label: 'Poster Image',
      admin: {
        description: 'Thumbnail shown before video plays',
      },
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Video Caption',
    },
    {
      name: 'autoPlay',
      type: 'checkbox',
      defaultValue: false,
      label: 'Auto Play',
    },
    {
      name: 'loop',
      type: 'checkbox',
      defaultValue: false,
      label: 'Loop Video',
    },
    {
      name: 'muted',
      type: 'checkbox',
      defaultValue: false,
      label: 'Muted by Default',
    },
  ],
}
