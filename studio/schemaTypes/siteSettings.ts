export const siteSettings = {
  name: 'siteSettings',
  title: 'Home Page Settings',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'selectedWorks',
      title: 'Selected Works',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'projects' }],
        },
      ],
      // Add a validation rule to limit the number of selected works to 8
      validation: (Rule: any) => Rule.max(8).warning('You can select up to 8 works.'),
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'text',
    },
    {
      name: 'awardsAndPress',
      title: 'Awards & Press',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'instagram',
      title: 'Instagram',
      type: 'string',
    },
  ],
}