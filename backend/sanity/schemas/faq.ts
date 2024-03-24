import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  title: 'FAQ',
  name: 'faq',
  type: 'document',
  fields: [
    defineField({ title: 'Question', name: 'question', type: 'string' }),
    defineField({
      title: 'Answer',
      name: 'answer',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
    }),
  ],
})
