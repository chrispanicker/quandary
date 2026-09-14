export const project = {
  name: "projects",
  title: "Projects",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "heroMedia",
      title: "Hero Media",
      type: "media",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "mediaGallery",
      title: "Media Gallery",
      type: "array",
      of: [
        {
          type: "media",
        },
      ],
    }
  ]
}
