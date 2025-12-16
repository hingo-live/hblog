import { createLocalReq, getPayload } from 'payload'
import { seedFromData } from '@/endpoints/seed/from-data'
import config from '@payload-config'
import { headers } from 'next/headers'

export const maxDuration = 300 // Allow up to 5 minutes for fetching images

export async function POST(): Promise<Response> {
  const payload = await getPayload({ config })
  const requestHeaders = await headers()

  // Authenticate by passing request headers
  const { user } = await payload.auth({ headers: requestHeaders })

  if (!user) {
    return new Response('Action forbidden.', { status: 403 })
  }

  try {
    // Create a Payload request object to pass to the Local API for transactions
    const payloadReq = await createLocalReq({ user }, payload)

    await seedFromData({ payload, req: payloadReq })

    return Response.json({ success: true })
  } catch (e) {
    payload.logger.error({ err: e, message: 'Error seeding data from data/ folder' })
    return new Response('Error seeding data.', { status: 500 })
  }
}
