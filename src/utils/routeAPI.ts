// require('dotenv').config;

const host = "http://localhost:3000";
// const host = "https://ya-todo-server.vercel.app";


export const ApiRoutes = {
    signup: `${host}/api/v1/user/signup`,
    login: `${host}/api/v1/user/signin`,
    todos: `${host}/api/v1/user/todos`,
    todocreate: `${host}/api/v1/todo/create`,
    changeProgress: `${host}/api/v1/todo/changeprogress`,
};