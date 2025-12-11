'use client'

import React, { useState, useEffect } from 'react'
import type { CarouselBlock as CarouselBlockType } from '@/payload-types'
import RichText from '@/components/RichText'
import { Card } from '@/components/Card'

export const CarouselBlock: React.FC<CarouselBlockType & { id?: string }> = (props) => {
  const { introContent, selectedPosts, autoPlay, autoPlaySpeed, showDots, showArrows } = props
  const [currentIndex, setCurrentIndex] = useState(0)

  const items = selectedPosts || []

  useEffect(() => {
    if (autoPlay && items.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length)
      }, autoPlaySpeed || 5000)
      return () => clearInterval(interval)
    }
  }, [autoPlay, autoPlaySpeed, items.length])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }

  return (
    <div className="container my-16">
      {introContent && (
        <div className="mb-8">
          <RichText data={introContent} enableGutter={false} />
        </div>
      )}
      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {items.map((post) => {
              if (typeof post === 'object' && post !== null) {
                return (
                  <div key={post.id} className="w-full flex-shrink-0 px-2">
                    <Card doc={post} relationTo="posts" showCategories />
                  </div>
                )
              }
              return null
            })}
          </div>
        </div>

        {showArrows && items.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg"
              aria-label="Previous"
            >
              ←
            </button>
            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg"
              aria-label="Next"
            >
              →
            </button>
          </>
        )}

        {showDots && items.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
