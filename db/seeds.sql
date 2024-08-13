INSERT INTO department (name)
VALUES
('Sales'),
('Engineering'),
('Marketing'),
('Human Resources');


INSERT INTO role (title, salary, department_id)
VALUES
 ('Sales Manager', 80000, 1),
 ('Sales Associate', 60000, 1),
 ('Engineering Manager', 100000, 2),
 ('Engineering Associate', 70000, 2),
 ('Marketing Manager', 90000, 3),
 ('Marketing Associate', 65000, 3),
 ('Human Resources Manager', 85000, 4),
 ('Human Resources Associate', 60000, 4);

 INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES

 ('John', 'Doe', 1, NULL),
 ('Jane', 'Smith', 2, 1),
 ('Michael', 'Johnson', 3, NULL),
 ('Sarah', 'Williams', 4, 3),
 ('David', 'Brown', 5, NULL),
 ('Samantha', 'Jones', 6, 5),
 ('Michael', 'Davis', 7, NULL),
 ('Emily', 'Miller', 8, 7);