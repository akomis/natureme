import { defineType, defineField, defineArrayMember } from 'sanity'

export const Category = defineType({
  title: 'Category',
  name: 'category',
  type: 'document',
  fields: [defineField({ title: 'Name', name: 'name', type: 'string' })],
})

export default defineType({
  title: 'Product',
  name: 'product',
  type: 'document',
  fields: [
    defineField({ title: 'Name', name: 'name', type: 'string' }),
    defineField({ title: 'Quantity', name: 'quantity', type: 'string' }),
    defineField({ title: 'Ingredients', name: 'ingredients', type: 'string' }),
    defineField({
      title: 'Thumbnail',
      name: 'thumbnail',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      title: 'Category',
      name: 'category',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      title: 'Gallery',
      name: 'gallery',
      type: 'array',
      of: [defineArrayMember({ type: 'image' })],
    }),
    defineField({
      title: 'Description',
      name: 'description',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
    }),
  ],
})
