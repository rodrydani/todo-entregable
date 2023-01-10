const express= require('express');
const db= require("./utils/database");
const initModels= require("./models/init.model");
const Users = require('./models/users.model');
const Todos = require('./models/todos.model');



const app = express();


app.use(express.json());

const PORT=8000;


//probando la coneccion a la base de datos

db.authenticate()
.then(()=>console.log("autenticacion exitosa"))
.catch((error)=>console.log("error"));

initModels();
db.sync({force:false})
    .then(()=>console.log("base de datos sincronizada"))
    .catch((error)=>console.log("error"))

app.get("/" ,(req, res)=>{
    res.status(200).json({messege:"bienvenido al servidor"});
})

//localhost:8000/users
//localhost:8000/todos

app.get("/users", async(req, res)=>{
   try{
     const result= await Users.findAll();
     res.status(200).json(result);
   } catch (error){
    console.log(error);
   }
});
/*todos */
app.get("/todos", async(req, res)=>{
    try{
      const result= await Todos.findAll();
      res.status(200).json(result);
    } catch (error){
     console.log(error);
    }
 });
//obtener el usuario sabiendo su id
app.get("/users/:id", async(req, res)=>{
   try{
    console.log(req.params);
    const { id }= req.params;
    const result= await Users.findByPk(id);
    res.status(200).json(result);
    res.send(id);
   }catch(error){
    console.log(error);
   }
});
/*todos */
app.get("/todos/:userId", async(req, res)=>{
    try{
     console.log(req.params);
     const { userId }= req.params;
     const result= await Todos.findByPk(userId);
     res.status(200).json(result);
     res.send(id);
    }catch(error){
     console.log(error);
    }
 });

app.get("/users/username/:username", async(req,res)=>{
    try{
        const{ username }= req.params;
        const result= await Users.findOne({where: { username }});
        res.status(200).json(result);
    }catch(error){
        res.status(400).json(error.messege);
        console.log(error);
    }
})

//post---

app.post("/users", async(req, res)=>{
    try{
    const user= req.body;
    const result= await Users.create(user);
   res.status(201).json(result);

    } catch(error){
        res.status(400).json(error.messege);
     console.log(error);
    }
});
/*todos */
app.post("/todos", async(req, res)=>{
    try{
    const todos= req.body;
    const result= await Todos.create(todos);
   res.status(201).json(result);

    } catch(error){
        res.status(400).json(error.messege);
     console.log(error);
    }
});

//put---

app.put("/users/:id", async (req, res)=>{
    try{
     const { id }= req.params;
     const field= req.body;
     const result= await Users.update(field, {where:{ id }});
     res.status(200).json(result);
    }catch(error){
        res.status(400).json(error.messege);
        console.log(error);
    }
})
/*todos */

app.put("/todos/:userId", async (req, res)=>{
    try{
     const { userId }= req.params;
     const field= req.body;
     const result= await Todos.update(field, {where:{ userId }});
     res.status(200).json(result);
    }catch(error){
        res.status(400).json(error.messege);
        console.log(error);
    }
})
//eliminar usuario

app.delete("/users/:id", async (req, res)=>{
    try{
        const { id } = req.params();
        const result= await Users.destroy({where:{ id }});
        res.status(200).json(result)
    }catch(error){
        res.status(400).json(error.messege);
        console.log(error);
    }
})
    /*      TODOS               */ 
    app.delete("/todos/:userId", async (req, res)=>{
        try{
            const { userId } = req.params();
            const result= await Todos.destroy({where:{ userId }});
            res.status(200).json(result)
        }catch(error){
            res.status(400).json(error.messege);
            console.log(error);
        }

     
     
})
app.listen(PORT, ()=>{
    console.log(`servidor corriendo en el puerto ${PORT}`);
})