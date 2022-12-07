

const connection = require('./db/connection.js');


const inquirer = require('inquirer');


const program_exit = () => {
    connection.end();
}

const viewDept = () => {

    return connection.promise().query(
        `SELECT * FROM  department;`).then(result => {
            console.table(result[0])
            mainMenu();
        })
}

const viewRole = () => {
    
    return connection.promise().query(
        `SELECT * FROM  role;`).then(result => {
            console.table(result[0])
            mainMenu();
        })
}

const viewEmpl = () => {
    return connection.promise().query(
        `SELECT * FROM  employee`).then(result => {
            console.log(result)
            mainMenu();
        })
}




const addRole = () => {
    connection.promise().query(
        `SELECT * FROM  department;`).then (result => {
            console.log(result[0])
            const deptChoices = result[0].map(dpt => {
                return {name:dpt.name, value:dpt.id}
            })
            console.log(deptChoices)
            
            return inquirer.prompt([
                
      
                {
                    type: "input",
                    message: "Enter new role",
                    name: "title"
                },
                {
                    type: "input",
                    message: "Enter salary",
                    name: "salary"
                },
                {
                    type: "list",
                    message: "What department does it belong to?",
                    name: "department_id",
                    choice: deptChoices,
                },
              
        
            ]).then(answers => {
                connection.promise().query("INSERT INTO role ?", answers)
            })

        })

    

}


// const addEmpl = () => {

//     return connection.promise().query(
//         `INSERT INTO employee SET ?`,
//         {
//             first_name: "",
//             last_name: "",
//             role_id: "",
//             manager_id: ""
//         },
//         (err, result) => {
//             if (err) {
//                 console.log(err);
//             }
//             console.log(result);
//             mainMenu();
//         });
// }


const mainMenu = () => {
    return inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do? ",
            choices: ["View all Employees", "Add an Employee", "Update Employee Role", "Add Role", "View all Roles", "View all Departments", "Add Department", "Exit"],
            name: "option"
        }
    ])
        .then(({ option }) => {
            console.log(option)
            switch (option) {
                case "Exit":
                    program_exit();
                    break;
                case "View all Employees":
                    viewEmpl();
                    break;
                // case "Add an Employee":
                //     addEmpl();
                //     break;
                case "View all Departments":
                    viewDept();
                    break;
                    
                case "Add Role":
                    addRole();
                    break;
                case "View all Roles":
                    viewRole();
                    break;
                // case "Update Employee Role":
                //     updateRole();
                //     break;
                


            }
        })


};
mainMenu();



// connection.end();
