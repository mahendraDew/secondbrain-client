// require('dotenv').config;

const host = "http://localhost:3000";
// const host = "https://ya-todo-server.vercel.app";


export const ApiRoutes = {
    signup: `${host}/api/v1/user/signup`,
    signin: `${host}/api/v1/user/signin`,
    contents: `${host}/api/v1/user/contents`,
    alltags: `${host}/api/v1/tag/alltags`,
    createtag: `${host}/api/v1/tag/createtag`,
    create: `${host}/api/v1/content/create`,
    remove: `${host}/api/v1/content/remove`,
    changeProgress: `${host}/api/v1/todo/changeprogress`,
};