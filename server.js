const inquirer = require('inquirer');
const db = require('./db/connection');
const cTable = require('console.table');



const startMenuQuestion = [
    {
      type: 'list',
      name: 'startMenuQuestion',
      message: 'What would you like to do?',
      choices: [
        "Show all Roles",
        "Add a Role",
        "Show all Departments",
        "Add a Department",
        "Show all Employees",
        "Add an Employee",
        "Update an Employee's role"
      ]
    }
  ]
  
  const addRoleQuestions = [
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of the new role?'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is the salary of the new role? (numbers only please, i.e. "100000")'
    },
    {
      type: 'input',
      name: 'department',
      message: 'What department is the new role in? Please type the number only of the department shown above! (i.e. "4")'
    }
  ]
  
  const addDepartmentQuestion = [
    {
      type: 'input',
      name: 'name',
      message: 'What department would you like to add?'
    }
  ]
  
  
  const addEmployeeQuestions = [
    {
      type: 'input',
      name: 'first_name',
      message: 'What is the first name of the new employee?'
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'What is the last name of the new employee?'
    },
    {
      type: 'input',
      name: 'role_id',
      message: 'What role is the new employee in? Please type the number only of the "id" section shown above! (i.e. "4")',
    },
    {
      type: 'input',
      name: 'manager_id',
      message: 'Who is the manager for the new employee? Please type the number only of the "id" section shown above! (i.e. "4")'
    }
  ]
  
  const chooseEmployeeQuestion = [
    {
      type: 'input',
      name: 'employee_id',
      message: 'Which employee would you like to update? Please only type the number of the "id" of the employee! (i.e. "4")'
    },
  ]
  
  const updateEmployeeRoleQuestion = [
    {
      type: 'input',
      name: 'role_id',
      message: 'What new role would you like for your employee? Please only type the number of the "id" of the role! (i.e. "4")'
    },
  ]

  const addRole = async () => {
    const resuslt = await inquirer.prompt(addRoleQuestions);
    const sql = `INSERT INTO roles (title, salary, department_id) 
    VALUES (?,?,?)`;
    const params = [resuslt.title, resuslt.salary, resuslt.department];

    db.query(sql, params, function (err, result) {
        console.log("");
        console.table(result);
    });
    startMenu();
  }
  
  const addDepartment = async () => {
    const resuslt = await inquirer.prompt(addDepartmentQuestion);
    const sql = `INSERT INTO departments (name) VALUES (?)`;
    const params = [resuslt.name];
    
    db.query(sql, params, function (err, result) {
        console.log("");
        console.table(result);
    });
    startMenu();
  }
  
  const addEmployee = async () => {
    const resuslt = await inquirer.prompt(addEmployeeQuestions);
    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) 
    VALUES (?,?,?,?)`;
    const params = [resuslt.first_name, resuslt.last_name, resuslt.role_id, resuslt.manager_id];
    
    db.query(sql, params, function (err, result) {
        console.log("");
        console.table(result);
    });
    startMenu();
  }
  
  const chooseEmployee = async () => {
   const resuslt = await inquirer.prompt(chooseEmployeeQuestion);

   db.query('SELECT role.id, role.title, FROM role', function (err, result) {
    console.log("");
    console.table(result);
   });
   updateEmployeeRole(resuslt.employee_id);
  }
  
  const updateEmployeeRole = async (employee_id) => {
    const resuslt = await inquirer.prompt(updateEmployeeRoleQuestion);
    const sql = `UPDATE employees SET role_id = ${resuslt.role_id}  WHERE id = ${employee_id};`;
    
    
    db.query(sql, function (err, result) {
        console.log("");
        console.table(result);
    });
    startMenu();
  }

  const startMenu = async () => {
    const result = await inquirer.prompt(startMenuQuestion)
    .then(function (result){
        switch(result.startMenuQuestion) {
            case "Show all Roles":
                db.query('SELECT role.id, role.title, role.salary, department.name as department_name FROM role LEFT JOIN department ON role.department_id = department.id;', function (err, result){
                    console.log("");
                    console.table(result);
                });
        startMenu();
        break;
        
            case "Add a Role":
                db.query('SELECT * FROM department;', function (err, result){
                    console.log("");
                    console.table(result);
                });
                addRole();
                break;
                
            case "Show all Departments":
                db.query('SELECT * FROM department;', function (err, result){
                    console.log("");
                    console.table(result);
                });
                startMenu();
                break;
                
            case "Add a Department":
                addDepartment();
                break;
                
            case "Show all Employees":
                db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name as department_name, CONCAT(manager.first_name, " ", manager.last_name) as manager_name FROM employees LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employees manager ON employee.manager_id = manager.id;', function (err, result){
                    console.log("");
                    console.table(result);
                });
                startMenu();
                break;
                
            case "Add an Employee":
                db.query('SELECT role.*, department.name as department_name FROM role LEFT JOIN department ON role.department_id = department', function (err, result){
                    console.log("");
                    console.table(result);
                });
                db.query('SELECT employee.*, role.title AS role_title FROM employee LEFT JOIN role ON employee.role_id = role.id', function (err, result){
                    console.log("");
                    console.table(result);
                });
                addEmployee();
                break;


            case "Update an Employee's role":
                db.query('SELECT employee.id, employee.first_name, employee.last_name, FROM employee', function (err, result){
                    console.log("");
                    console.table(result);
                });
                chooseEmployee();
                break;
       }
    });
  }

 const startApp = async () => {
  await db.connect();
  console.log('Connected to the database');

  await startMenu();
}
startApp();
