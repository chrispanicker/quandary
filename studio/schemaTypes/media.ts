export const media = {
  name: 'media',
  title: 'Media',
  type: 'object',
  fields: [
    {
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Used in the gallery preview',
    },
    {
      name: 'type',
      title: 'Media type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'radio',
      },
      initialValue: 'image',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      hidden: ({ parent }: { parent: { type: string } }) => parent?.type !== 'image',
    },
    {
      title: 'Video file',
      name: 'video',
      type: 'mux.video',
      hidden: ({ parent }: { parent: { type: string } }) => parent?.type !== 'video',
    },
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'type',
      media: 'image',
      video: 'video',
    },
    prepare(selection: {
      title?: string
      subtitle?: string
      media?: any
      video?: any
    }) {
      const { title, subtitle, media, video } = selection

      return {
        title: title || 'Untitled media',
        subtitle: subtitle === 'video' ? 'Video' : 'Image',
        media: subtitle === 'video' ? video : media,
      }
    },
  },
}