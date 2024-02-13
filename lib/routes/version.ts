import Elysia from 'elysia'

const route_version = new Elysia()
route_version.get(
  '/version',
  (ctx) => {
    return {
      version: '1.0.0',
    }
  },
  {
    detail: {
      description: 'Get the version of the API',
      responses: {
        200: {
          description: 'Success',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  version: {
                    type: 'string',
                    example: '1.0.0',
                  },
                },
              },
            },
          },
        },
      },
    },
  }
)

export default route_version
