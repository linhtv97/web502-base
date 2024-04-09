export type AuthForm = {
    email: string
    password: string
}

// {
//     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNkYWRzYUBkc2FkYXMuY29tIiwiaWF0IjoxNzEyNjY2OTk4LCJleHAiOjE3MTI2NzA1OTgsInN1YiI6IjEifQ.tSyy2l3vVWlJcdB5AjVal-ZQCn4rqjFg0dtcZv3o7Sg",
//     "user": {
//         "email": "sdadsa@dsadas.com",
//         "id": 1
//     }
// }

export type User =  {
    email: string
    id: number
}

export type LoginResponse = {
    accessToken: string
    user: User
}