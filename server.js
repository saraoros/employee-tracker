//require('dotenv').config();
const mysql = require('mysql2');
const inquirer = require('inquirer');
//const cTable = require('console.table');

const db = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
});
// db.query

function promptQuestions() {
  console.log(`
  *******************************************
      WELCOME TO YOUR EMPLOYEE TRACKER
  *******************************************
  
  `);
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'initOptions',
        message: 'What would you like to do first?',
        choices: [
          'View All Employees',
          'View All Employees By Department **',
          'View All Employees by Manager **',
          'Add Employee',
          'Remove Employee **',
          'Update Employee Role',
          'Update Employee Manager **',
        ],
      },
    ])
    .then((answers) => {
      // Use user feedback for... whatever!!
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
}

promptQuestions();
