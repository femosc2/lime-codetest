export const getMeetings = {
  tags: ['Meetings'],
  description: "Returns all meetings",
  operationId: 'getMeetings',
  responses: {
    "200": {
      description: "A list of meetings.",
      "content": {
        "application/json": {
          schema: {
            type: "array",
            items: {
              startDate: {
                type: 'date',
                description: 'Start Date'
              },
              endDate: {
                type: 'date',
                description: 'End Date'
              },
              user: {
                type: 'string',
                description: 'User ID'
              },
              MeetingId: {
                type: 'string',
                description: 'Meeting Id'
              },
            }
          }
        }
      }
    }
  }
}

export const newMeeting = {
  tags: ['Meetings'],
  description: "Create a new Meeting",
  operationId: 'newMeeting',
  post: {
    tags: ['CRUD operations'],
    description: 'Create users',
    operationId: 'createUsers',
    parameters: [{
      name: "name"
    }],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            user: "userId",
          }
        }
      },
      required: true
    },
    responses: {
      "200": {
        description: "Creates a new Meeting",
        "content": {
          "application/json": {
            schema: {
              type: "array",
              items: {
                startDate: {
                  type: 'date',
                  description: 'Start Date'
                },
                endDate: {
                  type: 'date',
                  description: 'End Date'
                },
                user: {
                  type: 'string',
                  description: 'User ID'
                },
                meetingId: {
                  type: 'string',
                  description: 'Meeting Id'
                },
              }
            }
          }
        }
      }
    }
  }
}