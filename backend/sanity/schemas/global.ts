import { defineType, defineField, defineArrayMember } from 'sanity'

const InfoFields = [
  defineField({ title: 'Text', name: 'text', type: 'string' }),
  defineField({ title: 'Link', name: 'link', type: 'string' }),
]

export default defineType({
  title: 'Global',
  name: 'global',
  type: 'document',
  fields: [
    defineField({ title: 'Logo', name: 'logo', type: 'image' }),
    defineField({
      title: 'About',
      name: 'about',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
    }),
    defineField({
      title: 'Info',
      name: 'info',
      type: 'object',
      fields: [
        {
          title: 'Telephone',
          name: 'telephone',
          type: 'object',
          fields: InfoFields,
        },
        {
          title: 'Email',
          name: 'email',
          type: 'object',
          fields: InfoFields,
        },
        {
          title: 'Instagram',
          name: 'instagram',
          type: 'object',
          fields: InfoFields,
        },
        {
          title: 'Address',
          name: 'address',
          type: 'object',
          fields: InfoFields,
        },
      ],
    }),
    defineField({
      title: 'Terms & Conditions',
      name: 'terms',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
    }),
    defineField({
      title: 'Privacy Policy',
      name: 'privacy',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
    }),
  ],
})
