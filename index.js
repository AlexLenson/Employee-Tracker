const { prompt } = require("inquirer");

const options = [
    "view all departments",
    "view all roles",
    "view all employees",
    "add a department",
    "add a role",
    "add an employee",
    "update an employee role"
];

const question = {
    type: "list",
    name: "selectedOption",
    message: "What do you want to do?",
    choices: options
};

