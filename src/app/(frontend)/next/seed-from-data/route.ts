import { createLocalReq, getPayload } from 'payload'
import { seedInline } from '@/endpoints/seed/seed-inline'
import config from '@payload-config'
import { headers } from 'next/headers'

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

    const result = await seedInline({ payload, req: payloadReq })

    return Response.json({ success: true, ...result })
  } catch (e) {
    payload.logger.error({ err: e, message: 'Error seeding data' })
    return new Response(`Error seeding data: ${e instanceof Error ? e.message : 'Unknown error'}`, {
      status: 500,
    })
  }
}
