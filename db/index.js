const pool = require('./connection');

class DB {
    constructor(){}
    async query( sql, args = []){
        const client = await pool.connect();
        try{
            const result = await client.query(sql, args);
            return result;
        } finally{
            client.release();
    }
}


findAllEmployees() {
    return this.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;");

}

viewRole(){
    return this.query("SELECT * FROM role");
}

viewDepartment(){
    return this.query("SELECT * FROM department");
}

addEmployee(first_name, last_name, role_id, manager_id){
    return this.query("INSERT INTO employee (firstname, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)", [first_name, last_name, role_id, manager_id]);
}

updateEmployee(id, first_name, last_name, role_id, manager_id){
    return this.query("UPDATE employee SET first_name=$1, last_name=$2, role_id=$3, manager_id=$4 WHERE id=$5", [first_name, last_name, role_id, manager_id, id]);
}

addRole(title, salary, department_id){
    return this.query("INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)", [title, salary, department_id]);
}

addDepartment(dName){
    return this.query("INSERT INTO department (name) VALUES ($1)", [dName]);
}

quitNow(){
    pool.end();
}
}
module.exports = new DB();


