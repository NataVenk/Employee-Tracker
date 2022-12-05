

const connection = require('./db/connection.js');


const inquirer = require('inquirer');

const program_exit = () => {
    connection.end();
}

const mainMenu = () => {
    return inquirer.prompt([
        {
            type: "input",
            message: "What woudl you like to do? ",
            choices: ["View all Employees", "Add an Employee", "Update Employee Role", "Add Role", "View all Roles", "View All Departments", "Add Department"],
            name: "option"
        }
    ])
    .then ( ({option}) => {
        switch(option){
            case "exit":
                return program_exit();
              

        }
    })
};

// const { table } = require('table');

// const mysql = require('mysql2');

// // const inquirer = require('inquirer');


// const PORT = process.env.PORT || 5001;
// const app = express();


// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// const db = mysql.createConnection(
//     {
//       host: 'localhost',
//       user: 'root',
//       password: 'root',
//       database: 'mycompany_db'
//     },
//     console.log(`Connected to the mycompany_db database.`)
//   );
connection.end();
