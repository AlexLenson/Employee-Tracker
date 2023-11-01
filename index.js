const { prompt } = require("inquirer");
const mysql = require('mysql2');

// const PORT = process.env.PORT || 3001;
// const app = express();

// Express middleware (do we need this?)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'rootroot',
        database: 'employees_db'
    },
    console.log(`Connected to the movies_db database.`)
);

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

prompt(question)
.then((answers) => {
    if (answers.selectedOption == "view all departments") {
        viewAllDepartments();
    }
})
.catch((error) => {
    console.error(error);
})