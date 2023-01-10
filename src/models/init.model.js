const Users= require("./users.model");
const Todos= require("./todos.model");
const Categories= require("./categories.model");
const TodosCategories= require("./todos-categories.model");
const initModels=()=>{
    Categories;
    TodosCategories;
    //vamso a crear las realciones
    //hasOne -> para indicar que tiene una tarea
    //hasMany -> para indicar que tiene muchas tareas
    //belongsTo -> que pertenece a:...
    Todos.belongsTo(Users, {as:"author", foreignKey:"user_id"});
    Users.hasMany(Todos,{as:"task", foreignKey:"user_id"});

    //relacion MYM entre categorias y task

    TodosCategories.belongsTo(Todos,{as:"task", foreignKey:"todo_id"});
    Todos.hasMany(TodosCategories,{as:"category", foreignKey:"todo_id"});

   TodosCategories.belongsTo(Categories,{as:"category", foreignKey:"category_id"});
   Categories.hasMany(TodosCategories,{as:"task", foreignKey:"category_id"}) ;

};

module.exports = initModels;