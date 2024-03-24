import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  title: 'Activity',
  name: 'activity',
  type: 'document',
  fields: [
    defineField({ title: 'Title', name: 'title', type: 'string' }),
    defineField({ title: 'Date', name: 'date', type: 'date' }),
    defineField({
      title: 'Gallery',
      name: 'gallery',
      type: 'array',
      of: [defineArrayMember({ type: 'image' })],
    }),
    defineField({
      title: 'Text',
      name: 'text',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
    }),
  ],
})
