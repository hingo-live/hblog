'use client'

import React, { useState } from 'react'
import type { NewsletterBlock as NewsletterBlockType } from '@/payload-types'
import RichText from '@/components/RichText'

export const NewsletterBlock: React.FC<NewsletterBlockType & { id?: string }> = (props) => {
  const {
    heading,
    description,
    placeholderText,
    buttonText,
    successMessage,
    backgroundColor,
    layout,
  } = props

  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      // Submit to your newsletter endpoint
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const bgClasses = {
    default: 'bg-gray-100 dark:bg-gray-800',
    primary: 'bg-blue-500 text-white',
    dark: 'bg-gray-900 text-white',
    gradient: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white',
  }

  return (
    <div className={`my-16 py-12 px-6 ${bgClasses[backgroundColor || 'default']} rounded-lg`}>
      <div className="container">
        <div
          className={
            layout === 'horizontal'
              ? 'flex flex-col md:flex-row items-center justify-between gap-6'
              : layout === 'card'
                ? 'max-w-md mx-auto text-center'
                : 'max-w-lg mx-auto text-center'
          }
        >
          <div className={layout === 'horizontal' ? 'flex-1' : ''}>
            {heading && <h3 className="text-2xl font-bold mb-2">{heading}</h3>}
            {description && <RichText data={description} enableGutter={false} />}
          </div>

          {status === 'success' ? (
            <p className="text-green-500 font-medium">{successMessage}</p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className={
                layout === 'horizontal'
                  ? 'flex gap-3'
                  : layout === 'card'
                    ? 'mt-4 space-y-3'
                    : 'mt-4 flex flex-col sm:flex-row gap-3'
              }
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={placeholderText || 'Enter your email'}
                required
                className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white flex-1 min-w-[250px]"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
              >
                {status === 'loading' ? 'Subscribing...' : buttonText || 'Subscribe'}
              </button>
            </form>
          )}

          {status === 'error' && (
            <p className="text-red-500 mt-2">Something went wrong. Please try again.</p>
          )}
        </div>
      </div>
    </div>
  )
}
