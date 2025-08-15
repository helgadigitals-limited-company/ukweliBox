import type { AppOpenAPI } from '@/lib/types.js'

import { Scalar } from '@scalar/hono-api-reference'

import packageJSON from '../../package.json' with { type: 'json' }

export default function configureOpenAPI(app: AppOpenAPI) {
  app.doc('/doc', {
    openapi: '3.0.0',
    info: {
      version: packageJSON.version,
      title: 'Ukweli Box API',
    },
  })

  app.get(
    '/reference',
    Scalar({
      url: '/doc',
      theme: 'kepler',
      layout: 'modern',
      defaultHttpClient: {
        targetKey: 'js',
        clientKey: 'fetch',
      },
    }),
  )
}
