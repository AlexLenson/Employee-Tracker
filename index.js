const { prompt } = require("inquirer");
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'rootroot',
        database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);

const options = [
    "view all departments",
    "view all roles",
    "view all employees",
    "add a department",
    "add a role",
    "add an employee",
    "update an employee role",
    "quit"
];

function mainPrompt(){
    prompt([
        {
            type: "list",
            name: "selectedOption",
            message: "What do you want to do?",
            choices: options
        }
    ]).then((answer)=>{
        let choice =answer.selectedOption

        switch(choice){
            case "view all departments":
                viewAllDepartments()
            break;
            case "view all roles":
                viewAllRoles()
            break;
            case "view all employees":
                viewAllEmployees()
            break;
            case "add a department":
                addDepartment()
            break;
            case "add a role":
                addRole()
            break;
            case "add an employee":
                addEmployee()
            break;
            case "update an employee role":
                updateEmpRole()
            break;
            default:
                db.end()
            break;

        }
    })
}

function viewAllDepartments(){
    db.query('SELECT * FROM department', (err, data)=>{
        if(err) throw err;
        console.table(data)
        mainPrompt()
    })
}

function viewAllRoles(){
    const query= "SELECT role.title, role.salary, department.name AS department FROM role LEFT JOIN department ON role.department_id =department.id"

    db.query(query, (err, data)=>{
        if(err) throw err
        console.table(data);
        mainPrompt()
    })
}

function viewAllEmployees(){
    const query= "SELECT employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager From employee LEFT JOIN role ON employee.id=role.id LEFT JOIN department ON role.department_id=department.id LEFT JOIN employee manager on manager.id=employee.manager_id"
    db.query(query, (err, data)=>{
        if(err) throw err;
        console.table(data)
        mainPrompt()
    })
}


function addRole(){
    db.query("SELECT * FROM department", (err, data)=>{
        if(err) throw err;

        let departments= data.map((department)=>({
            name:department.name, 
            value:department.id
        }));
      

        prompt([
            {
                type:"input",
                name:"title",
                message:"What Role would you like to add?"
            },
            {
                type: "input",
                name: "salary",
                message: "What is the role's salary?"
            },
            {
                type: "list",
                name: "department",
                message: "What department does the role belong to?",
                choices:departments
            },

        ]).then((answers)=>{
            db.query("INSERT INTO role SET ?",
            {
                title:answers.title,
                salary:answers.salary,
                department_id:answers.department
            },(err, data)=>{
                if(err) throw err;
                console.log(`The ${answers.title} Role was sucessfully added!`);
                mainPrompt()
            })
        })
    })
}
mainPrompt()

