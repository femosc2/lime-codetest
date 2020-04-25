export const getUsers = {
  tags: ['Users'],
  description: "Returns all users",
  operationId: 'getUsers',
  responses: {
    "200": {
      description: "A list of users.",
      "content": {
        "application/json": {
          schema: {
            type: "array",
            items: {
              id: {
                type: 'string',
                description: 'user Id'
              },
              name: {
                type: 'string',
                description: 'user Name'
              }
            }
          }
        }
      }
    }
  }
} 