export const getMeetings = {
  tags: ['Meetings'],
  description: "Returns all meetings",
  operationId: 'getMeetings',
  responses: {
    "200": {
      description: "A list of meetings.",
      content: {
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

export const createMeeting = {
  'tags': ['Meetings'],
  'description': 'Create a new meeting',
  'operationId': 'createMeeting',
  'consumes': "application/json",
  "parameters": [
    {
      "in": "query",
      "name": "newMeeting",
      "description": "The new Meeting to create",
      "schema": {
        "$ref": "#/definitions/Meeting"
      }
    }
  ],
  'produces': [
    "application/json"
  ],
  'responses': {
    '200': {
      'description': "OK",
      'schema': {
        '$ref': "#/definitions/Meeting"
      }
    },
    '400': {
      'description': "Failed. Bad post data."
    }
  }
}

export const suggestMeeting = {
  'tags': ['Meetings'],
  'description': 'Suggest a meeting',
  'operationId': 'suggestMeeting',
  'consumes': "application/json",
  "parameters": [
    {
      "in": "query",
      "name": "suggestMeeting",
      "description": "Suggest a meeting",
      "schema": {
        "$ref": "#/definitions/Meeting"
      }
    }
  ],
  'produces': [
    "application/json"
  ],
  'responses': {
    '200': {
      'description': "OK",
      'schema': {
        '$ref': "#/definitions/Meeting"
      }
    },
    '400': {
      'description': "Failed. Bad post data."
    }
  }
}