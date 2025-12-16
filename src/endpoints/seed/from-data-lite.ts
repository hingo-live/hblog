/**
 * Lightweight seed script for Cloudflare Workers
 * Creates categories, authors, and posts WITHOUT fetching external images
 * Instead, it stores the image URLs directly for use with next/image or Cloudflare Images
 */

import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest } from 'payload'

// Import data from the data folder
import { getAuthors } from '../../../data/authors'
import { getCategories } from '../../../data/categories'
import { getPostsDefault, getPostsAudio, getPostsVideo, getPostsGallery } from '../../../data/posts'

const collections: CollectionSlug[] = [
  'categories',
  'media',
  'pages',
  'posts',
  'forms',
  'form-submissions',
  'search',
]

const globals: GlobalSlug[] = ['header', 'footer']

// Create Lexical content from plain text
function createLexicalContent(text: string) {
  return {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: text,
              version: 1,
            },
          ],
          direction: 'ltr' as const,
          format: '' as const,
          indent: 0,
          textFormat: 0,
          version: 1,
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
              version: 1,
            },
          ],
          direction: 'ltr' as const,
          format: '' as const,
          indent: 0,
          textFormat: 0,
          version: 1,
        },
        {
          type: 'heading',
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'Key Highlights',
              version: 1,
            },
          ],
          direction: 'ltr' as const,
          format: '' as const,
          indent: 0,
          tag: 'h2',
          version: 1,
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
              version: 1,
            },
          ],
          direction: 'ltr' as const,
          format: '' as const,
          indent: 0,
          textFormat: 0,
          version: 1,
        },
      ],
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
}

export const seedFromDataLite = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<{ categories: number; authors: number; posts: number }> => {
  payload.logger.info('Seeding database (lite mode - no image uploads)...')

  // Clear existing data
  payload.logger.info(`— Clearing collections and globals...`)

  await Promise.all(
    globals.map((global) =>
      payload.updateGlobal({
        slug: global,
        data: {
          navItems: [],
        },
        depth: 0,
        context: {
          disableRevalidate: true,
        },
      }),
    ),
  )

  await Promise.all(
    collections.map((collection) => payload.db.deleteMany({ collection, req, where: {} })),
  )

  await Promise.all(
    collections
      .filter((collection) => Boolean(payload.collections[collection].config.versions))
      .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
  )

  // Fetch all data from data/ folder
  const [authorsData, categoriesData, postsDefault, postsAudio, postsVideo, postsGallery] =
    await Promise.all([
      getAuthors(),
      getCategories(),
      getPostsDefault(),
      getPostsAudio(),
      getPostsVideo(),
      getPostsGallery(),
    ])

  const allPostsData = [...postsDefault, ...postsAudio, ...postsVideo, ...postsGallery]

  // Maps to store created document IDs
  const categoryMap: Map<string, number> = new Map()
  const authorMap: Map<string, number> = new Map()

  payload.logger.info(`— Seeding categories (${categoriesData.length})...`)

  // Create categories (without thumbnails for speed)
  for (const category of categoriesData) {
    try {
      const categoryDoc = await payload.create({
        collection: 'categories',
        data: {
          title: category.name,
          slug: category.handle,
          description: category.description,
          color: category.color,
        },
      })

      categoryMap.set(category.id, categoryDoc.id)
    } catch (e) {
      payload.logger.error(`Failed to create category ${category.name}: ${e}`)
    }
  }

  payload.logger.info(`— Seeding authors (${authorsData.length})...`)

  // Delete existing demo users
  await payload.delete({
    collection: 'users',
    depth: 0,
    where: {
      email: {
        contains: '@demo.example.com',
      },
    },
  })

  // Create authors as users (without avatars for speed)
  for (const author of authorsData) {
    try {
      const userDoc = await payload.create({
        collection: 'users',
        data: {
          name: author.name,
          email: `${author.handle}@demo.example.com`,
          password: 'password123',
          role: 'author',
          bio: author.description,
          slug: author.handle,
        },
      })

      authorMap.set(author.id, userDoc.id)
    } catch (e) {
      payload.logger.error(`Failed to create author ${author.name}: ${e}`)
    }
  }

  payload.logger.info(`— Seeding posts (${allPostsData.length})...`)

  // Create posts sequentially (without hero images for speed)
  let postCount = 0
  for (const post of allPostsData) {
    try {
      // Get category IDs
      const categoryIds = post.categories
        ?.map((cat: { id: string }) => categoryMap.get(cat.id))
        .filter(Boolean) as number[]

      // Get author ID
      const authorId = authorMap.get(post.author?.id || '')

      await payload.create({
        collection: 'posts',
        depth: 0,
        context: {
          disableRevalidate: true,
        },
        data: {
          title: post.title,
          slug: post.handle,
          excerpt: post.excerpt,
          content: createLexicalContent(post.excerpt || ''),
          categories: categoryIds,
          authors: authorId ? [authorId] : [],
          _status: 'published',
          publishedAt: post.date,
          readingTime: post.readingTime || 5,
          views: post.viewCount || 0,
          likes: post.likeCount || 0,
          commentsCount: post.commentCount || 0,
          featured: postCount < 5, // Feature first 5 posts
        },
      })
      postCount++
    } catch (e) {
      payload.logger.error(`Failed to create post ${post.title}: ${e}`)
    }
  }

  payload.logger.info('✅ Seeding (lite mode) complete!')

  return {
    categories: categoryMap.size,
    authors: authorMap.size,
    posts: postCount,
  }
}
