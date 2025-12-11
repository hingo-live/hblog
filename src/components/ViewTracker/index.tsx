'use client'

import { useEffect, useRef } from 'react'

interface ViewTrackerProps {
  slug: string
}

export const ViewTracker: React.FC<ViewTrackerProps> = ({ slug }) => {
  const hasTracked = useRef(false)

  useEffect(() => {
    // Only track once per page load
    if (hasTracked.current) return
    hasTracked.current = true

    // Use a small delay to avoid counting quick bounces
    const timer = setTimeout(() => {
      fetch('/api/posts/view', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slug }),
      }).catch((error) => {
        console.error('Failed to track view:', error)
      })
    }, 1000) // Wait 1 second before counting the view

    return () => clearTimeout(timer)
  }, [slug])

  return null // This component doesn't render anything
}
