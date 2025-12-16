/**
 * Seed script that imports data from the data/ folder
 * This script creates categories, authors, and posts with their associated media
 */

import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest, File } from 'payload'

// Import data from the data folder
import {
  getAuthors,
  _demo_author_image_urls,
  _demo_author_cover_image_urls,
} from '../../../data/authors'
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

// Helper function to fetch image from URL
async function fetchFileByURL(url: string): Promise<File> {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Failed to fetch file: ${url}`)
  }

  const data = await res.arrayBuffer()
  const contentType = res.headers.get('content-type') || 'image/jpeg'
  const extension = contentType.includes('webp')
    ? 'webp'
    : contentType.includes('png')
      ? 'png'
      : 'jpg'

  // Generate a filename from the URL
  const urlParts = url.split('/')
  let filename = urlParts[urlParts.length - 1].split('?')[0]
  if (!filename.includes('.')) {
    filename = `image-${Date.now()}.${extension}`
  }

  return {
    name: filename,
    data: Buffer.from(data),
    mimetype: contentType,
    size: data.byteLength,
  }
}

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

export const seedFromData = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database from data/ folder...')

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
  const mediaMap: Map<string, number> = new Map()
  const categoryMap: Map<string, number> = new Map()
  const authorMap: Map<string, number> = new Map()

  payload.logger.info(`— Seeding categories (${categoriesData.length})...`)

  // Create categories
  for (const category of categoriesData) {
    try {
      // Fetch and create thumbnail if exists
      let thumbnailId: number | undefined

      if (category.thumbnail?.src) {
        const cachedMediaId = mediaMap.get(category.thumbnail.src)
        if (cachedMediaId) {
          thumbnailId = cachedMediaId
        } else {
          try {
            const file = await fetchFileByURL(category.thumbnail.src)
            const mediaDoc = await payload.create({
              collection: 'media',
              data: {
                alt: category.thumbnail.alt || category.name,
              },
              file,
            })
            thumbnailId = mediaDoc.id
            mediaMap.set(category.thumbnail.src, mediaDoc.id)
          } catch (e) {
            payload.logger.warn(`Failed to fetch thumbnail for category ${category.name}: ${e}`)
          }
        }
      }

      const categoryDoc = await payload.create({
        collection: 'categories',
        data: {
          title: category.name,
          slug: category.handle,
          description: category.description,
          color: category.color,
          icon: thumbnailId,
        },
      })

      categoryMap.set(category.id, categoryDoc.id)
      payload.logger.info(`  ✓ Created category: ${category.name}`)
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

  // Create authors as users
  for (const author of authorsData) {
    try {
      // Fetch and create avatar if exists
      let avatarId: number | undefined

      if (author.avatar?.src) {
        const cachedMediaId = mediaMap.get(author.avatar.src)
        if (cachedMediaId) {
          avatarId = cachedMediaId
        } else {
          try {
            const file = await fetchFileByURL(author.avatar.src)
            const mediaDoc = await payload.create({
              collection: 'media',
              data: {
                alt: author.avatar.alt || author.name,
              },
              file,
            })
            avatarId = mediaDoc.id
            mediaMap.set(author.avatar.src, mediaDoc.id)
          } catch (e) {
            payload.logger.warn(`Failed to fetch avatar for author ${author.name}: ${e}`)
          }
        }
      }

      // Create user with unique email
      const userDoc = await payload.create({
        collection: 'users',
        data: {
          name: author.name,
          email: `${author.handle}@demo.example.com`,
          password: 'password123',
          role: 'author',
          avatar: avatarId,
          bio: author.description,
          slug: author.handle,
        },
      })

      authorMap.set(author.id, userDoc.id)
      payload.logger.info(`  ✓ Created author: ${author.name}`)
    } catch (e) {
      payload.logger.error(`Failed to create author ${author.name}: ${e}`)
    }
  }

  payload.logger.info(`— Seeding posts (${allPostsData.length})...`)

  // Create posts sequentially to maintain order
  for (const post of allPostsData) {
    try {
      // Fetch and create hero image if exists
      let heroImageId: number | undefined

      if (post.featuredImage?.src) {
        const cachedMediaId = mediaMap.get(post.featuredImage.src)
        if (cachedMediaId) {
          heroImageId = cachedMediaId
        } else {
          try {
            const file = await fetchFileByURL(post.featuredImage.src)
            const mediaDoc = await payload.create({
              collection: 'media',
              data: {
                alt: post.featuredImage.alt || post.title,
              },
              file,
            })
            heroImageId = mediaDoc.id
            mediaMap.set(post.featuredImage.src, mediaDoc.id)
          } catch (e) {
            payload.logger.warn(`Failed to fetch hero image for post ${post.title}: ${e}`)
          }
        }
      }

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
          heroImage: heroImageId,
          content: createLexicalContent(post.excerpt || ''),
          categories: categoryIds,
          authors: authorId ? [authorId] : [],
          _status: 'published',
          publishedAt: post.date,
          readingTime: post.readingTime || 5,
          views: post.viewCount || 0,
          likes: post.likeCount || 0,
          commentsCount: post.commentCount || 0,
          featured: Math.random() > 0.8, // Randomly feature some posts
        },
      })

      payload.logger.info(`  ✓ Created post: ${post.title}`)
    } catch (e) {
      payload.logger.error(`Failed to create post ${post.title}: ${e}`)
    }
  }

  payload.logger.info('✅ Seeding from data/ folder complete!')
}
