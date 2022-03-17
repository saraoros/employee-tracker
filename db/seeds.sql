-- this is where I will create the values for the tables??
INSERT INTO department (id, name)
VALUES 
(1, "Sales"),
(2, "Engineering"),
(3, "Finance"),
(4, "Legal");

INSERT INTO role (id, title, salary, department_id)
VALUES
(11, "Salesperson", 80000, 1),
(12, "Salesperson", 70000, 1),
(22, "Senior Software Engineer", 120000, 2),
(28, "Software Engineer", 150000, 2),
(32, "Account Manager", 160000, 3),
(33, "Accountant", 125000, 3),
(44, "Legal Team Lead", 250000, 4),
(45, "Lawyer", 190000, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
(22, "John", "Doe", 11, null),
(24, "Mike", "Chan", 12, 22),
(44, "Ashley", "Rodriguez", 22, null),
(36, "Kevin", "Tupik", 28, 44),
(64, "Kunal", "Singh", 32, null),
(66, "Malia", "Brown", 33, 64),
(88, "Sarah", "Lourd", 44, null),
(90, "Tom", "Allen", 45, 88);
