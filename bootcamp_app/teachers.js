const { Pool } = require('pg');

//Connect to bootcampx database 
const pool = new Pool({
  user: 'akshathakulkarni',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

//Data from user
const cohortName = process.argv[2] || 'JUL02';
// Store all potentially malicious values in an array.
const values = [`%${cohortName}%`];

const queryString = `
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name LIKE $1
ORDER BY teacher;
`;

pool.query(queryString, values)
.then(res => {
  res.rows.forEach(row => {
    console.log(`${row.cohort}: ${row.teacher}`);
  })
});