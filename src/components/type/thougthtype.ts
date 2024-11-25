export type ThoughtProp = {
    _id: string,
    link: string,
    title: string,
    description?: string,
    date: string,
    tags?: Type[],
    type: string,
}

type Type = {
    _id: string,
    title: string
}