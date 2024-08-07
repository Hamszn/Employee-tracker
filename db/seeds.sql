INSERT INTO department (name)
VALUES
('Sales'),
('Engineering'),
('Marketing'),
('Human Resources'),

INSERT INTO role (title, salary, department_id)
VALUES
("Sales Lead", 250000 , 1),
("Sales Associate", 150000, 1),
("Engineering Manager", 300000, 2),
("Engineering Associate", 100000, 2),
("Marketing Manager", 250000, 3),
("Marketing Associate", 100000, 3),
("Human Resources Manager", 200000, 4),
("Human Resources Associate", 50000, 4),


 INSERT INTO employee ( first_name, last_name, role_id, manager_id)
 VALUES
 ('John', 'Doe', 1, NULL),
 ('James', 'White', 2, 1),
 ('Jane', 'Smith', 3, NULL),
 ('Sarah', 'Johnson', 4, 3),
 ('Michael', 'Brown', 5, NULL),
 ('Emily', 'Davis', 6, 5),
 ('David', 'Green', 7, NULL),
 ('Sarah', 'Thompson', 8, 7),

