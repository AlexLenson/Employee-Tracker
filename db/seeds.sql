USE employees_db;

INSERT INTO department (id, name)
VALUES
(1, 'Human Resources'),
(2,'Finance'),
(3, 'Legal'),
(4, 'Engineering');

INSERT INTO role (id, title, salary, department_id)
VALUES
(1, 'Recruiter', 50000, 1),
(2, 'Lawyer', 100000, 3),
(3, 'Accountant', 70000, 2),
(4, 'Junior Developer', 60000, 4),
(5, 'Senior Recruiter', 90000, 1),
(6, 'Senior Accountant', 100000, 2),
(7, 'Senior Web Developer', 110000, 4),
(8, 'Senior Partner', 110000, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
(1, 'John', 'Smith', 5, NULL),
(2, 'Steven', 'Johnson', 6, NULL),
(3, 'Adam', 'Smith', 7, NULL),
(4, 'Jessica', 'Parker', 8, NULL),
(5, 'Jeremy', 'Blake', 1, 1),
(6, 'Owen', 'Wilson', 2, 2),
(7, 'Martha', 'Williams', 3, 3),
(8, 'Justin', 'Mills', 4, 4);