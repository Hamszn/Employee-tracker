const inquirer = require('inquirer');
const { debug } = require('console');
const db = require('./db/index');
const path = require('path');

function mainMenu() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'options',
      message: 'What would you like to do?',
      choices: [
          {
              name:'View All Employee',
              value: 'VIEW_ALL_EMPLOYEE',
          },
          {
              name:'Add Employee',
              value: 'ADD_EMPLOYEE',
          },
          {   name: 'Update Employee Role',
              value: 'UPDATE_EMPLOYEE_ROLE',
          },
          {
              name: 'View All Roles',
              value: 'VIEW_ALL_ROLES',
          },  
          {
              name: 'Add Role',
              value: 'ADD_ROLE',
          },  
          {
              name: 'View All Departments',
              value: 'VIEW_ALL_DEPARTMENTS',
          },   
          {
              name: 'Add Department',
              value: 'ADD_DEPARTMENT',
          }, 
          {
              name: 'Quit',
              value: 'QUIT',
          }, 
      ],
  },
]).then((answers)=>{
  let option = answers.options;
  switch (option) {
      case 'VIEW_ALL_EMPLOYEE':
          viewAllEmployee();
          break;
      case 'ADD_EMPLOYEE':
          addEmployee();
          break;
      case 'UPDATE_EMPLOYEE_ROLE':
          updateEmployee();
          break;
      case 'VIEW_ALL_ROLES':
          viewRoles();
          break;
      case 'ADD_ROLE':
          addRole();
          break;
      case 'VIEW_ALL_DEPARTMENTS':
          viewDepartments();
          break;
      case 'ADD_DEPARTMENT':
          addDepartment();
          break;
      default:
          quit();
  }
});
};


function viewAllEmployee() {
  db.findAllEmployees()
  .then(({rows}) => {
    let employees = rows;
    console.table(employees);
  })
  .then(() => mainMenu())
}

 function addEmployee() {
  let role = db.viewRole();
  let department =  db.viewDepartment();
  inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'Enter employee first name:',
    },

    {
      type: 'input',
      name: 'lastName',
      message: 'Enter employee last name:',
    },

    {
      type: 'list',
      name: 'roleId',
      message: 'Choose employee role:',
      choices: addRole(({ id, title }) => ({
        name: title,
        value: id,
      })),
    },

    {
      type: 'list',
      name: 'departmentId',
      message: 'Choose employee department:',
      choices: addDepartment (({ id, name }) => ({
        name,
        value: id,
      })),
    },
  ])
   .then(({ firstName, lastName, roleId, departmentId }) => {
      db.addEmployee(firstName, lastName, roleId, departmentId)
       .then(() => console.log('Employee added successfully!'))
       .then(() => mainMenu());
    });
    mainMenu();
}

 function updateEmployee() {
  let employees =  db.findAllEmployees();
  let roles =  db.viewRole();
  inquirer.prompt([
    {
      type: 'list',
      name: 'employeeId',
      message: 'Choose an employee to update:',
      choices: employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id,
      })),
    },

    {
      type: 'list',
      name: 'roleId',
      message: 'Choose new employee role:',
      choices: role.map(({ id, title }) => ({
        name: title,
        value: id,
      })),
    },
  ])
   .then(({ employeeId, roleId }) => {
      db.updateEmployee(employeeId, roleId)
       .then(() => console.log('Employee role updated successfully!'))
       .then(() => mainMenu());
    });
    mainMenu();

}

function viewRoles() {
  db.viewRole()
   .then(({ rows }) => {
      let role = rows;
      console.table(role);
    })
   .then(() => mainMenu());
}

function addRole() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter role title:',
    },

    {
      type: 'input',
      name: 'salary',
      message: 'Enter role salary:',
    },
  ])

   .then(({ title, salary }) => {
      db.addRole(title, salary)
       .then(() => console.log('Role added successfully!'))
       .then(() => mainMenu());
    });
    mainMenu();
}

function viewDepartments() {
  db.viewDepartment()
   .then(({ rows }) => {
      let departments = rows;
      console.table(departments);
    })
   .then(() => mainMenu());
}

function addDepartment() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter department name:',
    },
  ])
   .then(({ name }) => {
      db.addDepartment(name)
       .then(() => console.log('Department added successfully!'))
       .then(() => mainMenu());
    });
    mainMenu();
}

function quit() {
  console.log('Goodbye!');
  process.exit();
}

mainMenu();

