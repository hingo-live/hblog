import React from 'react'
import type { GridBlock as GridBlockType } from '@/payload-types'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'

export const GridBlock: React.FC<GridBlockType & { id?: string }> = (props) => {
  const { introContent, columns, items } = props

  const gridCols = {
    '2': 'grid-cols-1 md:grid-cols-2',
    '3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    '4': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <div className="container my-16">
      {introContent && (
        <div className="mb-8">
          <RichText data={introContent} enableGutter={false} />
        </div>
      )}
      <div className={`grid ${gridCols[columns || '3']} gap-6`}>
        {items?.map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            {item.image && typeof item.image === 'object' && (
              <div className="aspect-video">
                <Media resource={item.image} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-6">
              <h4 className="text-lg font-bold mb-2">{item.title}</h4>
              {item.description && (
                <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
              )}
              {item.enableLink && item.link && (
                <div className="mt-4">
                  <CMSLink {...item.link} className="text-blue-500 hover:underline" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
