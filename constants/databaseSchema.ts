
export const SCHEMA: Record<string, string[]> = {
    instructor: ['ID varchar(5)', 'name varchar(20) NOT NULL', 'dept_name varchar(20)', 'salary numeric(8,2)'],
    department: ['dept_name varchar(20)', 'building varchar(15)', 'budget numeric(12,2)'],
    student: ['ID varchar(5)', 'name varchar(20)', 'dept_name varchar(20)', 'tot_cred numeric(3,0)'],
    takes: ['ID varchar(5)', 'course_id varchar(8)', 'sec_id varchar(8)', 'semester varchar(6)', 'year numeric(4,0)', 'grade varchar(2)'],
    course: ['course_id varchar(8)', 'title varchar(50)', 'dept_name varchar(20)', 'credits numeric(2,0)'],
    teaches: ['ID varchar(5)', 'course_id varchar(8)', 'sec_id varchar(8)', 'semester varchar(6)', 'year numeric(4,0)'],
};

export const SAMPLE_DATA: string[] = [
    // Departments
    "INSERT INTO department VALUES ('Comp. Sci.', 'Taylor', 100000);",
    "INSERT INTO department VALUES ('Physics', 'Watson', 70000);",
    "INSERT INTO department VALUES ('Biology', 'Darwin', 90000);",
    "INSERT INTO department VALUES ('History', 'Painter', 50000);",
    "INSERT INTO department VALUES ('Finance', 'Painter', 120000);",

    // Instructors
    "INSERT INTO instructor VALUES ('10101', 'Srinivasan', 'Comp. Sci.', 65000);",
    "INSERT INTO instructor VALUES ('12121', 'Wu', 'Finance', 90000);",
    "INSERT INTO instructor VALUES ('22222', 'Einstein', 'Physics', 95000);",
    "INSERT INTO instructor VALUES ('32343', 'El Said', 'History', 60000);",
    "INSERT INTO instructor VALUES ('45565', 'Katz', 'Comp. Sci.', 75000);",
    "INSERT INTO instructor VALUES ('58583', 'Califieri', 'History', 62000);",
    "INSERT INTO instructor VALUES ('76766', 'Crick', 'Biology', 72000);",
    "INSERT INTO instructor VALUES ('83821', 'Brandt', 'Comp. Sci.', 92000);",
    "INSERT INTO instructor VALUES ('98345', 'Kim', 'Physics', 80000);",
    
    // Courses
    "INSERT INTO course VALUES ('BIO-101', 'Intro. to Biology', 'Biology', 4);",
    "INSERT INTO course VALUES ('CS-101', 'Intro. to Computer Science', 'Comp. Sci.', 4);",
    "INSERT INTO course VALUES ('CS-315', 'Robotics', 'Comp. Sci.', 3);",
    "INSERT INTO course VALUES ('CS-347', 'Database System Concepts', 'Comp. Sci.', 3);",
    "INSERT INTO course VALUES ('FIN-201', 'Investment Banking', 'Finance', 3);",
    "INSERT INTO course VALUES ('HIS-351', 'World History', 'History', 3);",
    "INSERT INTO course VALUES ('PHY-101', 'General Physics', 'Physics', 4);",
    
    // Students
    "INSERT INTO student VALUES ('00128', 'Zhang', 'Comp. Sci.', 102);",
    "INSERT INTO student VALUES ('12345', 'Shankar', 'Comp. Sci.', 32);",
    "INSERT INTO student VALUES ('19991', 'Brandt', 'History', 80);",
    "INSERT INTO student VALUES ('23121', 'Chavez', 'Finance', 110);",
    "INSERT INTO student VALUES ('44553', 'Peltier', 'Physics', 56);",
    "INSERT INTO student VALUES ('54321', 'Williams', 'Comp. Sci.', 54);",
    
    // Takes
    "INSERT INTO takes VALUES ('00128', 'CS-101', '1', 'Fall', 2017, 'A');",
    "INSERT INTO takes VALUES ('00128', 'CS-347', '1', 'Fall', 2017, 'A-');",
    "INSERT INTO takes VALUES ('12345', 'CS-101', '1', 'Fall', 2017, 'C');",
    "INSERT INTO takes VALUES ('12345', 'CS-315', '1', 'Spring', 2018, 'A');",
    "INSERT INTO takes VALUES ('19991', 'HIS-351', '1', 'Spring', 2018, 'B');",
    "INSERT INTO takes VALUES ('23121', 'FIN-201', '1', 'Spring', 2018, 'C+');",
    "INSERT INTO takes VALUES ('44553', 'PHY-101', '1', 'Fall', 2017, 'B-');",
    "INSERT INTO takes VALUES ('54321', 'CS-101', '1', 'Fall', 2017, 'A-');",
    "INSERT INTO takes VALUES ('54321', 'CS-315', '1', 'Spring', 2018, 'B+');",

    // Teaches
    "INSERT INTO teaches VALUES ('10101', 'CS-101', '1', 'Fall', 2017);",
    "INSERT INTO teaches VALUES ('10101', 'CS-315', '1', 'Spring', 2018);",
    "INSERT INTO teaches VALUES ('45565', 'CS-347', '1', 'Fall', 2017);",
    "INSERT INTO teaches VALUES ('12121', 'FIN-201', '1', 'Spring', 2018);",
    "INSERT INTO teaches VALUES ('22222', 'PHY-101', '1', 'Fall', 2017);",
    "INSERT INTO teaches VALUES ('32343', 'HIS-351', '1', 'Spring', 2018);",
    "INSERT INTO teaches VALUES ('76766', 'BIO-101', '1', 'Summer', 2018);"
];
