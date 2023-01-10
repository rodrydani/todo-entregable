const db = require("../utils/database");
const Users = require("../models/users.model"); 
const Todos= require("../models/todos.model")
const users=[
    { username:"rodrigo", email:"rodrigo@email.com", password:"1234"},//id:1
    { username:"rosi", email:"rosi@email.com", password:"1342"},//id:2
    { username:"more", email:"more@email.com", password:"1221"}//id:3
];



const todos=[
    {title:"task 1", description:"description for 1", userId:1},
    {title:"task 2", description:"description for 2", userId:2},
    {title:"task 3", description:"description for 3", userId:3}
];
//const categories=[];
//const todosCategories=[];   


db.sync({force:false})
.then(()=>{
    console.log("iniciando....");
    users.forEach((user)=>Users.create(user));
    setTimeout(()=>{
   todos.forEach((todo)=> Todos.create(todo));
    },100);
})
.catch((error)=>console.log("error"))