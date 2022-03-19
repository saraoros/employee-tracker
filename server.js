const connection = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');

// SELECT title, department_name
// FROM role JOIN department
// ON department_id = department(id);

// -- role_id: INT to hold reference to employee role
// -- manager_id: INT to hold reference to another employee that is the manager of the current employee (null if the employee has no manager

// Connecting to Database
connection.connect(
  console.log(`

  *******************************************
      WELCOME TO YOUR EMPLOYEE TRACKER

            LETS GET STARTED!
  *******************************************
  
  `)
);

function promptQuestions() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'initMenu',
        message: 'What would you like to do?',
        choices: [
          'View All Employees',
          'View All Departments',
          'View All Roles',
          'Add Employee',
          'Update Employee Role',
          'Quit',
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
      if (initMenu === 'Quit') {
        // This will end server connection
        connection.end(
          console.log(`
      *******************************************
        YOUR SESSION HAS END, SEE YOU NEXT TIME!
      *******************************************
        
        `)
        );
      }
    })
    .catch((error) => {
      if (error) throw error(404);
    });
}

// Start of initMenu functions:

// View All Employees function
const allEmployees = () => {
  let sql = `SELECT employee.id, employee.first_name,
             employee.last_name, department.department_name AS Department, role.salary
             FROM employee, role, department
             WHERE department.id = role.department_id
             AND role.id = employee.role_id`;

  connection.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    promptQuestions(
      console.log(`
    *******************************************
          ALL EMPLOYEES LISTED ABOVE
    *******************************************

    
    
    `)
    );
  });
};

// View All Departments function
const allDepartments = () => {
  let sql = `SELECT department.id, department.department_name 
             AS Departments
             FROM department`;

  connection.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    promptQuestions(
      console.log(`
    *******************************************
            ALL DEPARTMENTS LISTED ABOVE
    *******************************************

    
    
    `)
    );
  });
};

// View All Roles function
const allRoles = () => {
  let sql = `SELECT * FROM role`;

  connection.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    promptQuestions(
      console.log(`
    *******************************************
            ALL ROLES ARE LISTED ABOVE
    *******************************************

    
    
    `)
    );
  });
};

// View Add Employee function
const addEmployee = () => {
  let sql = ``;
  // need to add inquirer questions
  connection.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    promptQuestions(
      console.log(`
    *******************************************
                NEW EMPLOYEE ADDED
    *******************************************

    
    
    `)
    );
  });
};

// Update an Employee function
const updateEmployee = () => {
  let sql = ``;
  // need to add inquirer questions here & add an array with employee name
  connection.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    promptQuestions(
      console.log(`
    *******************************************
          EMPLOYEE HAS BEEN UPDATED
    *******************************************

    
    
    `)
    );
  });
};

promptQuestions();
