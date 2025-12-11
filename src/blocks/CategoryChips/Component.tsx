import React from 'react'
import Link from 'next/link'
import type { CategoryChipsBlock as CategoryChipsBlockType } from '@/payload-types'
import RichText from '@/components/RichText'

export const CategoryChipsBlock: React.FC<CategoryChipsBlockType & { id?: string }> = (props) => {
  const { introContent, selectedCategories } = props

  return (
    <div className="container my-8">
      {introContent && (
        <div className="mb-6">
          <RichText data={introContent} enableGutter={false} />
        </div>
      )}
      <div className="flex flex-wrap gap-3">
        {selectedCategories?.map((category) => {
          if (typeof category === 'object' && category !== null) {
            return (
              <Link
                key={category.id}
                href={`/posts?category=${category.slug}`}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                style={category.color ? { backgroundColor: category.color } : undefined}
              >
                {category.title}
              </Link>
            )
          }
          return null
        })}
      </div>
    </div>
  )
}
