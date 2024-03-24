import { defineType, defineField } from 'sanity'

export default defineType({
  title: 'Testimonial',
  name: 'testimonial',
  type: 'document',
  fields: [
    defineField({ title: 'Author', name: 'author', type: 'string' }),
    defineField({ title: 'Date', name: 'date', type: 'date' }),
    defineField({ title: 'Text', name: 'text', type: 'string' }),
    defineField({ title: 'Hyperlink', name: 'hyperlink', type: 'url' }),
  ],
})
