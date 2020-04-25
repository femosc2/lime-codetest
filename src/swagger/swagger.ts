import { getUsers } from "./endpoints/users.swagger";

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
    tags: [
        {
            name: 'users'
        }
    ],
    paths: {
        "/api/v1/users": {
            "get": getUsers
        }
    }
}