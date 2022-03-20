const connection = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');

// Connecting to Database
connection.connect(
  console.log(`

  *******************************************
      WELCOME TO YOUR EMPLOYEE TRACKER

            LETS GET STARTED!
  *******************************************
  
  `)
);

// Start of initial Menu questions
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
      *********************************************
        YOUR SESSION HAS ENDED, SEE YOU NEXT TIME!
      *********************************************
        
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
  let sql = `SELECT role.id, role.title, department.department_name AS department
             FROM role
             LEFT JOIN department ON role.department_id`;

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
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'employeeFirst',
        message: 'What is the first name of your employee?',
        validate: (firstName) => {
          if (firstName) {
            return true;
          } else {
            console.log(`Please enter your employee's first name`);
            return false;
          }
        },
      },
      {
        type: 'input',
        name: 'employeeLast',
        message: 'What is the last name of your employee?',
        validate: (lastName) => {
          if (lastName) {
            return true;
          } else {
            console.log(`Please enter your employee's first name`);
            return false;
          }
        },
      },
    ])
    .then((answer) => {
      const employeeInfo = [answer.employeeFirst, answer.employeeLast];

      // Capture new employee's role
      const sqlRole = `SELECT role.id, role.title
                     FROM role`;

      connection.query(sqlRole, (err, data) => {
        if (err) throw err;

        const rolesData = data.map(({ id, title }) => ({
          name: title,
          value: id,
        }));
        inquirer
          .prompt([
            {
              type: 'list',
              name: 'role',
              message: `What is your new employee's role?`,
              choices: rolesData,
            },
          ])
          .then((newRole) => {
            const employeeRole = newRole.employeeRole;
            employeeInfo.push(employeeRole);

            // Capture new employee's manager
            const sqlManager = `SELECT * FROM employee`;
            connection.query(sqlManager, (err, data) => {
              if (err) throw err;
              const newManager = data.map(({ id, first_name, last_name }) => ({
                name: first_name + ' ' + last_name,
              }));

              inquirer
                .prompt([
                  {
                    type: 'list',
                    name: 'employeeManager',
                    message: `Who is your new employee's manager?`,
                    choices: newManager,
                  },
                ])
                .then((chosenManager) => {
                  const selectedManager = chosenManager.employeeManager;
                  employeeInfo.push(selectedManager);

                  const addEmployeesql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                                          VALUES (?, ?, ?, ?)`;
                  connection.query(addEmployeesql, employeeInfo, (err) => {
                    if (err) throw err;
                    // console.table(res);
                    allEmployees(
                      console.log(`
                 *******************************************
                           NEW EMPLOYEE ADDED
                 *******************************************

    
    
                  `)
                    );
                    promptQuestions();
                  });
                });
            });
          });
      });
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
