

const connection = require('./db/connection.js');


const inquirer = require('inquirer');


// const program_exit = () => {
//     connection.end();
// }
const dbQuery = (query) => {
    // another section to take in input... and create a dynamic promise
  
    return new Promise( (resolve, reject) => { 
      connection.query(query, function (err, results) {
        // if bad
        if(err){
          return reject(err);
        }
  
        // good
        // console.log(results);
        return resolve(results);
      });
  
    });
  };
  
  const dbQuery2 = (query,parameters) => {
    // another section to take in input... and create a dynamic promise
  
    return new Promise( (resolve, reject) => { 
      connection.query(query, parameters, function (err, results) {
        // if bad
        if(err){
          return reject(err);
        }
  
        // good
        // console.log(results);
        return resolve(results);
      });
  
    });
  };
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
            console.log(result[0])
            mainMenu();
        })
}




const addRole = () => {
    connection.promise().query(
        `SELECT * FROM  department;`).then(result => {

            const deptChoices = result[0].map(dpt => {
                return { name: dpt.name, value: dpt.id }
            })

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
                    choices: deptChoices,
                },


            ]).then(answers => {
                connection.query("INSERT INTO role SET ?", [answers],
                    function (err, result) {
                        if (err) {
                            console.log(err);
                        }
                        console.log("new role added")
                        mainMenu();
                    })



            },)


        });
}


    const addDept = () => {

        return inquirer.prompt([

            {
                type: "input",
                message: "Enter department name",
                name: "name"
            },

        ]).then(answers => {
            connection.query("INSERT INTO department SET ?", [answers],
                function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    console.log("Department added")
                    mainMenu();
                });
        },)


    }

const addEmpl = async () => {
    const roles = await dbQuery("SELECT * FROM role");
    const roleChoices = roles.map( role => ({
        name: role.title,
        value: role.id
        
      }));
      const managers = await dbQuery("SELECT * FROM employee");
    const mngrChoices = managers.map( manager => ({
        name: manager.last_name + manager.first_name,
        value: manager.id

    }));
    const answer = await inquirer.prompt([

        {
            type: "input",
            message: "Enter new employee first name",
            name: "first_name"
        },
        {
            type: "input",
            message: "Enter new employee last name",
            name: "last_name"
        },
        {
            type: "list",
            message: "What is new employee role?",
            name: "role_id",
            choices: roleChoices,
        },
        {
            type: "list",
            message: "Who is employee manager?",
            name: "manager_id",
            choices: mngrChoices,
        },


    ]);
    
        connection.query("INSERT INTO employee SET ?", [answer],
            function (err, result) {
                if (err) {
                    console.log(err);
                }
   
    console.log("Employee added")
                    mainMenu();
    
    },)
}
const updateEmpl = async () => {

    const emplAll = await dbQuery("SELECT * FROM employee");
    const emplChoices = emplAll.map( employee => ({
        name: employee.last_name + employee.first_name,
        value: employee.id
       
    }));
    const roles = await dbQuery("SELECT * FROM role");
    const roleChoices = roles.map( role => ({
        name: role.title,
        value: role.id
        
    }));
    console.log(emplChoices)

    const answer = await inquirer.prompt([

        {
            type: "input",
            message: "Which employee would you like to update?",
            name: "employee_name",
            choices: emplChoices,
        },
        {
            type: "list",
            message: "What role would you like to assign to the employee?",
            name: "role_id",
            choices: roleChoices,
        },
        


    ]);
    
        connection.query("INSERT INTO employee SET ?", [answer],
            function (err, result) {
                if (err) {
                    console.log(err);
                }
   
    console.log("Employee updated")
                    mainMenu();
    
    },)
}
    const program_exit = () =>{
        // use this when you want to exit the script
        connection.end();
      }

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
                    case "Add an Employee":
                        addEmpl();
                        break;
                    case "View all Departments":
                        viewDept();
                        break;
                    case "Add Department":
                        addDept();
                        break;

                    case "Add Role":
                        addRole();
                        break;
                    case "View all Roles":
                        viewRole();
                        break;
                    case "Update Employee Role":
                        updateEmpl();
                        break;



                }
            })
           

    };
    mainMenu();


