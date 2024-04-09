// {
//     "id": 1,
//     "title": "His mother had always taught him",
//     "content": "His mother had always taught him not to ever think of himself as better than others. He'd tried to live by this motto. He never looked down on those who were less fortunate or who had less money than him. But the stupidity of the group of people he was talking to made him change his mind.",
//     "category": "Life"
//   },

export type Post = {
    id: number
    title: string
    content: string
    category: string

}

export type PostForm = {
    title: string
    content: string
    category: string

}