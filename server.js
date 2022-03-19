const connection = require('./db/connection');
const inquirer = require('inquirer');
//const cTable = require('console.table');


// tutor notes:

// function x() {
//   return db.query('SELECT * FROM department');
// }
// async function y() {
//   const dept = await x();
//   console.log(dept);
// }

// function z() {
//   db.query('SELECT * FROM department', (err, res) => {
//     console.log(res);
//   });
// }

// function a() {
//   db.query('SELECT * FROM department', (err, res) => {
//     console.log(res);
//   });
// }

// Connecting to Database
connection.connect();

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
        name: 'initMenu',
        message: 'What would you like to do first?',
        choices: [
          'View All Employees',
          'View All Departments',
          'View All Roles',
          'Add Employee',
          'Update Employee Role',
          'View All Employees By Department **',
          'View All Employees by Manager **',
          'Remove Employee **',
          'Update Employee Manager **',
        ],
      },
    ])
    .then((answers) => {
      const { initMenu } = answers;

      if (initMenu === 'View All Employees') {
        allEmployees();
      }

      if (initMenu === 'View All Departments') {
        allDepartments();
      }
      if (initMenu === 'View All Roles') {
        allRoles();
      }
      if (initMenu === 'Add Employee') {
        addEmployee();
      }
      if (initMenu === 'Update Employee Role') {
        updateEmployee();
      }
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
