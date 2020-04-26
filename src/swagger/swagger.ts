import { getUsers } from "./endpoints/users.swagger";
import { getMeetings, createMeeting } from "./endpoints/meetings.swagger";

export const swaggerDocument = {
    openapi: '3.0.1',
    info: {
        version: '1.0.0',
        title: 'APIs Document',
        description: 'your description here',
        termsOfService: '',
        contact: {
            name: 'Felix Morau',
            email: 'felixmorau@gmail.com',
            url: 'https://felixmorau.se'
        },
        license: {
            name: 'Apache 2.0',
            url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
        }
    },
    security: [{api_key: [""]}],
    tags: [
        {
            name: 'users'
        }
    ],
    paths: {
        // USERS
        "/api/v1/users": {
            "get": getUsers
        },
        // MEETINGS
        "/api/v1/meetings": {
            "get": getMeetings
        },
        "/api/v1/meetings/createMeeting": {
            "post": createMeeting
        }
    },
    definitions: {
        "Meeting": {
            "type": "object",
            "properties": {
                "startDate": {
                    "type": "string"
                },
                "endDate": {
                    "type": "string"
                },
                "user": {
                    "type": "string"
                },
            }
        }
    }
}