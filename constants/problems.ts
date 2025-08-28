
import { Problem } from '../types';

export const PROBLEMS: Problem[] = [
    {
        id: 1,
        description: "Find the names of all instructors.",
        query: "SELECT name FROM instructor;"
    },
    {
        id: 2,
        description: "Find the department names of all instructors, and remove duplicates.",
        query: "SELECT DISTINCT dept_name FROM instructor;"
    },
    {
        id: 3,
        description: "Find all instructor names in the 'Comp. Sci.' department.",
        query: "SELECT name FROM instructor WHERE dept_name = 'Comp. Sci.';"
    },
    {
        id: 4,
        description: "Find the names of all instructors in the Comp. Sci. department with a salary greater than 70000.",
        query: "SELECT name FROM instructor WHERE dept_name = 'Comp. Sci.' AND salary > 70000;"
    },
    {
        id: 5,
        description: "Find the names of instructors, and the course IDs they taught.",
        query: "SELECT name, course_id FROM instructor, teaches WHERE instructor.ID = teaches.ID;"
    },
    {
        id: 6,
        description: "List the names of all instructors in alphabetic order.",
        query: "SELECT name FROM instructor ORDER BY name;"
    },
    {
        id: 7,
        description: "Find the names of all instructors with salary between 90,000 and 100,000.",
        query: "SELECT name FROM instructor WHERE salary BETWEEN 90000 AND 100000;"
    },
    {
        id: 8,
        description: "Find the average salary of instructors in the 'Comp. Sci.' department.",
        query: "SELECT avg(salary) FROM instructor WHERE dept_name = 'Comp. Sci.';"
    },
    {
        id: 9,
        description: "Find the total number of instructors who taught a course in 2018.",
        query: "SELECT count(DISTINCT ID) FROM teaches WHERE year = 2018;"
    },
    {
        id: 10,
        description: "Find the average salary of instructors in each department.",
        query: "SELECT dept_name, avg(salary) FROM instructor GROUP BY dept_name;"
    },
    {
        id: 11,
        description: "Find the names of departments where the average salary of instructors is greater than 70,000.",
        query: "SELECT dept_name FROM instructor GROUP BY dept_name HAVING avg(salary) > 70000;"
    },
    {
        id: 12,
        description: "Find all courses taught in the Fall 2017 semester.",
        query: "SELECT course_id FROM teaches WHERE semester = 'Fall' AND year = 2017;"
    },
    {
        id: 13,
        description: "Find the names of all instructors whose name includes the substring 'an'.",
        query: "SELECT name FROM instructor WHERE name LIKE '%an%';"
    },
    {
        id: 14,
        description: "Using a subquery in the FROM clause, find the average instructor salary in those departments where the average salary is over 42,000.",
        query: "SELECT dept_name, avg_salary FROM (SELECT dept_name, avg(salary) as avg_salary FROM instructor GROUP BY dept_name) WHERE avg_salary > 42000;"
    },
    {
        id: 15,
        description: "List all departments along with the number of instructors in each department.",
        query: "SELECT dept_name, (SELECT count(*) FROM instructor WHERE department.dept_name = instructor.dept_name) FROM department;"
    }
];
