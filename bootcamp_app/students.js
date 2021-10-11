const { Pool } = require('pg');

//Connect to bootcampx database 
const pool = new Pool({
  user: 'akshathakulkarni',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

//Data from user
const cohortName = process.argv[2];
const limit = process.argv[3] || 5;
// Store all potentially malicious values in an array.
const values = [`%${cohortName}%`, limit];

//Query to get student data
const queryString = `
  SELECT students.id as student_id, students.name as name, cohorts.name as cohort
  FROM students
  JOIN cohorts ON cohorts.id = cohort_id
  WHERE cohorts.name LIKE $1
  LIMIT $2;
  `;

//pool.query is a function that accepts an SQL query as a JavaScript string
pool.query(queryString, values)
  //function returns a promise with response when query is successful
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
  })
})
.catch(err => console.error('query error', err.stack));